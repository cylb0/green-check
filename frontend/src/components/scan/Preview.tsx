import { useEffect, useState } from "react"
import { FaArrowsRotate } from "react-icons/fa6";
import { PageHeader, PreviewForm } from "@/components";
import { useTranslation } from "@/hooks";
import { HOME_PAGE, LEAF_DETECTION_DEBUG, LEAF_SCAN_CONFIDENCE_TRESHOLD, SCAN_PAGE } from "@/constants";
import { PREVIEW_CONTENT } from "@/data";
import { detectLeaf, type LeafDetectionResult } from "@/services";
import toast from "react-hot-toast"

interface PreviewProps {
    blob: Blob
    onRetry: () => void
}

export default function Preview({ blob, onRetry }: PreviewProps) {
    const [imagePreview, setImagePreview] = useState("")
    const { title, formTitle, leafDetected, limitations, preliminary } = useTranslation(PREVIEW_CONTENT)
    const [detectionResult, setDetectionResult] = useState<LeafDetectionResult | null>(null)

    useEffect(() => {
        const url = URL.createObjectURL(blob)
        setImagePreview(url)
        return () => URL.revokeObjectURL(url)
    }, [blob])

    useEffect(() => {
        setDetectionResult(null)
        const toastId = toast.loading(preliminary)
        detectLeaf(blob, LEAF_SCAN_CONFIDENCE_TRESHOLD, LEAF_DETECTION_DEBUG).then((res) => {
            setDetectionResult(res)
            toast.dismiss(toastId)
            if (res.detected) toast.success(leafDetected)
        })
    }, [blob])

    const isAnalyzing = detectionResult === null
    const isLeafDetected = detectionResult?.detected ?? false

    return (
        <div className="relative min-h-screen flex flex-col overflow-hidden">
            <div
                className="absolute inset-0 bg-gradient-to-b from-pine-800/20 via-pine-900/40 to-pine-900/60 pointer-events-none z-0"
                aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col h-full p-4">
                <PageHeader title={title} to={SCAN_PAGE} variant="dark" />

                <div className="relative self-center mt-6 rounded-2xl overflow-hidden">
                    {imagePreview ? (
                        <img
                            src={imagePreview}
                            alt="Plant"
                            className="w-screen max-w-none h-[33vh] max-h-72 relative left-1/2 -translate-x-1/2 object-cover"
                        />
                    ) : (
                        <div className="w-screen max-w-none h-[33vh] max-h-72 relative left-1/2 -translate-x-1/2 bg-ink-inverse/10 animate-pulse" />
                    )}
                    <button
                        className="absolute right-3 bottom-3 h-9 w-9 rounded-full
                            bg-ink-inverse/15 backdrop-blur-md flex items-center justify-center
                            transition-all duration-150
                            hover:-translate-y-0.5 hover:bg-ink-inverse/22 active:translate-y-0 active:scale-90"
                        onClick={onRetry}
                    >
                        <FaArrowsRotate className="text-ink-inverse" size={16} />
                    </button>
                </div>

                <h2 className="text-subheading text-ink-inverse mt-8">
                    {formTitle}
                </h2>
                <p className="text-xs text-ink-inverse/50 italic my-1">
                    {limitations}
                </p>

                <PreviewForm blob={blob} isAnalyzing={isAnalyzing} isLeafDetected={isLeafDetected} />
            </div>
        </div>
    )
}
