import type { RefObject } from "react";
import type Webcam from "react-webcam";

export function useCameraCapture(
    webcamRef: RefObject<Webcam>,
    frameRef: RefObject<HTMLDivElement>
) {
    const capture = (onCapture: (blob: Blob) => void) => {
        const webcam = webcamRef.current
        const frame = frameRef.current
        const video = webcam?.video

        if (!video || !frame) return

        const frameRect = frame.getBoundingClientRect()

        const videoWidth = video.videoWidth
        const videoHeight = video.videoHeight
        const displayWidth = video.clientWidth
        const displayHeight = video.clientHeight

        const videoRatio = videoWidth / videoHeight
        const displayRatio = displayWidth / displayHeight

        let scale: number
        let offsetX = 0
        let offsetY = 0

        if (videoRatio > displayRatio) {
            scale = displayHeight / videoHeight
            offsetX = (videoWidth * scale - displayWidth) / 2
        } else {
            scale = displayWidth / videoWidth
            offsetY = (videoHeight * scale - displayHeight) / 2
        }

        const cropX = (frameRect.left + offsetX) / scale
        const cropY = (frameRect.top + offsetY) / scale
        const cropW = frameRect.width / scale
        const cropH = frameRect.height / scale

        const canvas = document.createElement("canvas")
        canvas.width = cropW
        canvas.height = cropH
        
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        ctx.drawImage(video, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH)
        canvas.toBlob((blob) => {
            if (blob) onCapture(blob)
        }, "image/jpeg", 0.85)
    }
    
    return { capture }
}
