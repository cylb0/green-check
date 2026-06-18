import { useRef, useState } from "react"
import { IoImagesOutline, IoRefreshOutline } from "react-icons/io5"
import Webcam from "react-webcam"
import { CAMERA_TOOLTIP } from "../data/scanPage"
import { CAMERA_LAYOUT_CONFIG } from "../constants/camera"
import { useCameraCapture } from "../hooks/useCameraCapture"
import Preview from "../components/analyze-page/Preview"
import { SubmissionProvider } from "../context/SubmissionContext"
import { useNavigate } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "../hooks/useTranslation"

const cornerStyle = "absolute border-white size-6 w-8 h-8"

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

            <div className="absolute inset-0 flex items-center justify-center">
                <div ref={frameRef} className={`relative ${CAMERA_LAYOUT_CONFIG.FRAME_SIZE_TW}`}>
                    <span className={`${cornerStyle} top-0 left-0 border-t-2 border-l-2 rounded-tl-xl`} />
                    <span className={`${cornerStyle} top-0 right-0 border-t-2 border-r-2 rounded-tr-xl`} />
                    <span className={`${cornerStyle} bottom-0 left-0 border-b-2 border-l-2 rounded-bl-xl`} />
                    <span className={`${cornerStyle} bottom-0 right-0 border-b-2 border-r-2 rounded-br-xl`} />
                </div>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 bottom-52">
                <div className="bg-black/50 backdrop-blur-sm rounded-2xl px-5 py-3 text-white text-sm text-center leading-snug">
                    {cameraLabel}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-around items-center px-8 pb-12 pt-4">
                <button className="text-white active:opacity-60 transition-opacity">
                    <IoImagesOutline size={28} />
                </button>

                <button
                    onClick={handleCapture}
                    className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center active:scale-95 transition-transform"
                >
                    <div className="w-14 h-14 rounded-full bg-white" />
                </button>

                <button
                    onClick={toggleCamera}
                    className="text-white active:opacity-60 transition-opacity"
                >
                    <IoRefreshOutline size={28} />
                </button>
            </div>
        </div>
    )
}
