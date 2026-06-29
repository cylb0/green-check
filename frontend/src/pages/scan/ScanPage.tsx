import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Webcam from "react-webcam"
import { CameraFrame, CaptureControls, CaptureLabel, Preview } from "@/components"
import { SubmissionProvider } from "@/context"
import { useCameraCapture, useTranslation } from "@/hooks"
import { CAMERA_TOOLTIP } from "@/data"
import { FaArrowLeft } from "react-icons/fa"

export default function ScanPage() {
    const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null)
    const webcamRef = useRef<Webcam>(null!)
    const frameRef = useRef<HTMLDivElement>(null!)
    const [facingMode, setFacingMode] = useState<"user" | "environment">("environment")
    const { capture } = useCameraCapture(webcamRef, frameRef)
    const navigate = useNavigate()
    const cameraLabel = useTranslation(CAMERA_TOOLTIP)

    const toggleCamera = () => {
        setFacingMode(prev => prev === "environment" ? "user" : "environment")
    }

    const handleCapture = () => {
        capture((blob) => setCapturedBlob(blob))
    }

    if (capturedBlob) {
        return (
            <SubmissionProvider>
                <Preview
                    blob={capturedBlob}
                    onRetry={() => setCapturedBlob(null)}
                />
            </SubmissionProvider>
        )
    }

    return (
        <div className="relative h-screen w-full bg-red overflow-hidden">
            <button
                onClick={() => navigate("/")}
                className="absolute top-4 left-4 z-10 justify-self-start text-white active:scale-110 hover:scale-110"
            >
                <FaArrowLeft size={24} />
            </button>

            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode }}
                className="h-full w-full object-cover"
            />

            <CameraFrame ref={frameRef} />

            <CaptureLabel>
                {cameraLabel}
            </CaptureLabel>

            <CaptureControls
                onCapture={handleCapture}
                onToggleCamera={toggleCamera}
            />
        </div>
    )
}
