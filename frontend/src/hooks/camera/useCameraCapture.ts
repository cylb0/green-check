import type { RefObject } from "react";
import type Webcam from "react-webcam";
import { CAMERA_CAPTURE_TARGET_SIZE } from "../../constants";

export function useCameraCapture(
    webcamRef: RefObject<Webcam>,
    frameRef: RefObject<HTMLDivElement>
) {
    const capture = (onCapture: (blob:Blob) => void) => {
        const webcam = webcamRef.current
        const frame = frameRef.current
        const video = webcam?.video

        if (!video || !frame) return

        const videoWidth = video.videoWidth
        const videoHeight = video.videoHeight

        const videoRect = video.getBoundingClientRect()
        const frameRect = frame.getBoundingClientRect()

        const ratioX = videoWidth / videoRect.width
        const ratioY = videoHeight / videoRect.height

        const centerX = ((frameRect.left + frameRect.width / 2) - videoRect.left) * ratioX
        const centerY = ((frameRect.top + frameRect.height / 2) - videoRect.top) * ratioY

        const size = Math.min(
            frameRect.width * ratioX,
            frameRect.height * ratioY
        )

        let cropX = centerX - size / 2
        let cropY = centerY - size / 2

        if (cropX < 0) cropX = 0
        if (cropY < 0) cropY = 0
        if (cropX + size > videoWidth) cropX = videoWidth - size
        if (cropY + size > videoHeight) cropY = videoHeight - size

        const canvas = document.createElement("canvas")
        canvas.width = CAMERA_CAPTURE_TARGET_SIZE
        canvas.height = CAMERA_CAPTURE_TARGET_SIZE

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        ctx.drawImage(
            video,
            cropX,
            cropY,
            size,
            size,
            0,
            0,
            CAMERA_CAPTURE_TARGET_SIZE,
            CAMERA_CAPTURE_TARGET_SIZE
        )

        canvas.toBlob((blob) => {
            if (blob) onCapture(blob)
        }, "image/jpeg", 0.9)
    }
    
    return { capture }
}
