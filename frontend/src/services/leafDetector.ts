import { CAMERA_CAPTURE_TARGET_SIZE, LEAF_DETECTION_MODEL_PATH, LEAF_SCAN_CONFIDENCE_TRESHOLD } from "@/constants"
import * as ort from "onnxruntime-web"

let session: ort.InferenceSession | null = null

/**
 * Retrieves the ONNX Runtime inference session, creating it a single time and
 * exposing the same instance for every subsequent calls (singleton)
 */
async function getSession(): Promise<ort.InferenceSession> {
    if (session) return session
    session = await ort.InferenceSession.create(LEAF_DETECTION_MODEL_PATH)
    return session
}

/**
 * Converts an HTML image element to a Float32Array suitable for ONNX Runtime inference
 * Letterboxing the image to ensure it fits within the target size while maintaining its aspect ratio.
 * 
 * @param img Source image to convert
 * @returns Flattened Float32Array representing a [3, 640, 640] CHW tensor (RGB channels stored separately)
 */
function imageToTensor(img: HTMLImageElement): Float32Array {
    const targetSize = 640
    const canvas = document.createElement('canvas')
    canvas.width = targetSize
    canvas.height = targetSize
    const ctx = canvas.getContext('2d')!

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, targetSize, targetSize)

    const scale = Math.min(targetSize / img.width, targetSize / img.height)
    const scaledWidth = img.width * scale
    const scaledHeight = img.height * scale
    const offsetX = (targetSize - scaledWidth) / 2
    const offsetY = (targetSize - scaledHeight) / 2

    ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight)

    const imageData = ctx.getImageData(0, 0, targetSize, targetSize)
    const { data } = imageData

    const float32Data = new Float32Array(3 * targetSize * targetSize)
    const pixelCount = targetSize * targetSize

    for (let i = 0; i < pixelCount; i++) {
        float32Data[i] = data[i * 4] / 255.0
        float32Data[i + pixelCount] = data[i * 4 + 1] / 255.0
        float32Data[i + pixelCount * 2] = data[i * 4 + 2] / 255.0
    }

    return float32Data
}

/**
 * Loads a Blob within an HTMLImageElement, ready to be drawn on the canvas.
 * Created ObjectURL is automatically revoked when the image is no longer needed
 * to avoid memory leaks.
 * 
 * @param blob Source blob image (as captured by the camera)
 * @returns Resolved promise with loaded image element
 */
function blobToImage(blob: Blob): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(blob)
        const img = new Image()
        img.onload = () => {
            URL.revokeObjectURL(url)
            resolve(img)
        }
        img.onerror = reject
        img.src = url
    })
}

/**
 * Raw decoded detection output from the YOLO model within a 640*640 space (training dataset)
 */
interface Detection {
    x: number
    y: number
    width: number
    height: number
    confidence: number
}

/**
 * Simplified result as exposed by `detectLeaf`
 */
export interface LeafDetectionResult {
    /** true if at least a leaf has been detected after filtering */
    detected: boolean
    /** Best confidence score or null */
    confidence: number | null
}

/**
 * Filters model's output anchor boxes to only include those with a confidence score above the given threshold.
 * 
 * @param data Raw model output (flattened Float32Array)
 * @param numAnchors Total number of achors in the model output (8400 for YOLO11 640*640)
 * @param confThreshold Minimal confidence threshold
 * @returns A list of validated detections
 */
function decodeOutput(data: Float32Array, numAnchors: number, confThreshold: number): Detection[] {
    const detections: Detection[] = []

    for (let i = 0; i < numAnchors; i++) {
        const confidence = data[4 * numAnchors + i]

        if (confidence < confThreshold) continue

        detections.push({
            x: data[0 * numAnchors + i],
            y: data[1 * numAnchors + i],
            width: data[2 * numAnchors + i],
            height: data[3 * numAnchors + i],
            confidence,
        })
    }

    return detections
}

/**
 * Computes the Intersection Over Union between two detections.
 * Used to remove duplicate detections.
 * 
 * @returns Ratio between 0 (no overlap) and 1 (same box)
 */
function iou(a: Detection, b: Detection): number {
    const ax1 = a.x - a.width / 2, ay1 = a.y - a.height / 2
    const ax2 = a.x + a.width / 2, ay2 = a.y + a.height / 2
    const bx1 = b.x - b.width / 2, by1 = b.y - b.height / 2
    const bx2 = b.x + b.width / 2, by2 = b.y + b.height / 2

    const interX1 = Math.max(ax1, bx1)
    const interY1 = Math.max(ay1, by1)
    const interX2 = Math.min(ax2, bx2)
    const interY2 = Math.min(ay2, by2)

    const interArea = Math.max(0, interX2 - interX1) * Math.max(0, interY2 - interY1)
    const areaA = a.width * a.height
    const areaB = b.width * b.height

    return interArea / (areaA + areaB - interArea)
}

/**
 * Applies a Non-Maximum Suppression (NMS) to discard overlapping detections
 * keeping only the most confident record.
 * 
 * @param detections Raw detections, with potential duplicates
 * @param iouThreshold IOU threshold used to assert that two boxes are considered the same
 * @returns Filtered detections, ordered by descending confidence
 */
function nonMaxSuppression(detections: Detection[], iouThreshold: number): Detection[] {
    const sorted = [...detections].sort((a, b) => b.confidence - a.confidence)
    const kept: Detection[] = []

    while (sorted.length > 0) {
        const best = sorted.shift()!
        kept.push(best)

        for (let i = sorted.length - 1; i >= 0; i--) {
            if (iou(best, sorted[i]) > iouThreshold) {
                sorted.splice(i, 1)
            }
        }
    }

    return kept
}

/**
 * Runs leaf detection inference on a given image blob.
 * 
 * Pipeline:
 *  -> load image
 *  -> convert to a 640x640 letterboxed tensor
 *  -> run ONNX inference
 *  -> filter by confidence threshold
 *  -> apply NMS
 *  -> keep the highest-confidence detection
 * 
 * @param blob Source image to analyze (webcam input)
 * @param confThreshold Minimum confidence score for a detection to be kept
 * @param debug Wether or not to display diagnostic logs
 * @returns The detection result (wether a leaf was found, and the best detection's confidence)
 */
export async function detectLeaf(
    blob: Blob,
    confThreshold = LEAF_SCAN_CONFIDENCE_TRESHOLD,
    debug = false
): Promise<LeafDetectionResult> {
    try {
        const s = await getSession()
        const img = await blobToImage(blob)

        const inputData = imageToTensor(img)
        const inputTensor = new ort.Tensor('float32', inputData, [1, 3, 640, 640])

        const feeds: Record<string, ort.Tensor> = {}
        feeds[s.inputNames[0]] = inputTensor

        const results = await s.run(feeds)
        const output = results[s.outputNames[0]]
        const data = output.data as Float32Array
        const numAnchors = output.dims[2]

        const rawDetections = decodeOutput(data, numAnchors, confThreshold)
        const finalDetections = nonMaxSuppression(rawDetections, 0.5)

        debug && logDetectionDiagnostics(data, numAnchors, confThreshold, rawDetections, finalDetections)

        const best = [...finalDetections].sort((a, b) => b.confidence - a.confidence)[0] ?? null

        return {
            detected: finalDetections.length > 0,
            confidence: best?.confidence ?? null
        }
    } catch (error) {
        console.error('Error while inferring onnx model', error)
        return { detected: false, confidence: null }
    }
}

function logDetectionDiagnostics(
    data: Float32Array,
    numAnchors: number,
    confThreshold: number,
    rawDetections: Detection[],
    finalDetections: Detection[]
): void {
    let maxConf = -Infinity
    let maxConfIdx = -1
    for (let i = 0; i < numAnchors; i++) {
        const conf = data[4 * numAnchors + i]
        if (conf > maxConf) {
            maxConf = conf
            maxConfIdx = i
        }
    }

    console.log('===DIAGNOSTIC detectLeaf===')
    console.log('Max raw confidence found:', maxConf, 'at anchor', maxConfIdx)
    console.log(`x/y/w/h of that anchor (${CAMERA_CAPTURE_TARGET_SIZE} resolution):`, {
        x: data[0 * numAnchors + maxConfIdx],
        y: data[1 * numAnchors + maxConfIdx],
        w: data[2 * numAnchors + maxConfIdx],
        h: data[3 * numAnchors + maxConfIdx],
    })

    const allConfs: number[] = []
    for (let i = 0; i < numAnchors; i++) {
        allConfs.push(data[4 * numAnchors + i])
    }
    allConfs.sort((a, b) => b - a)
    console.log('Top 10 raw confidences:', allConfs.slice(0, 10))

    console.log(`Detections kept with threshold ${confThreshold}:`, rawDetections.length)
    console.log('Final detections after NMS:', finalDetections.length)
}
