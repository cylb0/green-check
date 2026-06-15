import { useRef, useState } from "react"
import { IoImagesOutline, IoRefreshOutline } from "react-icons/io5"
import Webcam from "react-webcam"
import { useSubmission } from "../hooks/useSubmission"
import { CAMERA_TOOLTIP } from "../data/analyzePage"
import { CAMERA_LAYOUT_CONFIG } from "../constants/camera"
import { useCameraCapture } from "../hooks/useCameraCapture"

const cornerStyle = "absolute border-white size-6 w-8 h-8"

export default function AnalyzePage() {
    const webcamRef = useRef<Webcam>(null!)
    const frameRef = useRef<HTMLDivElement>(null!)
    const [facingMode, setFacingMode] = useState<"user" | "environment">("environment")
    const { submit } = useSubmission()
    const { capture } = useCameraCapture(webcamRef, frameRef)

    const toggleCamera = () => {
        setFacingMode(prev => prev === "environment" ? "user" : "environment")
    }

    const handleCapture = () => {
        capture((blob) => submit(blob))
    }

    return (
        <div className="relative h-screen w-full bg-red overflow-hidden">
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
                    {CAMERA_TOOLTIP}
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
