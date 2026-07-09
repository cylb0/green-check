import { useEffect, useState } from "react"
import { FaArrowsRotate } from "react-icons/fa6";
import { PageHeader, PreviewForm } from "@/components";
import { useTranslation } from "@/hooks";
import { HOME_PAGE, LEAF_DETECTION_DEBUG, LEAF_SCAN_CONFIDENCE_TRESHOLD } from "@/constants";
import { PREVIEW_CONTENT } from "@/data";
import { detectLeaf, type LeafDetectionResult } from "@/services";
import toast from "react-hot-toast"

interface PreviewProps {
    blob: Blob
    onRetry: () => void
}

export default function Preview({ blob, onRetry }: PreviewProps) {
    const [imagePreview, setImagePreview] = useState("")
    const { title, formTitle, leafDetected, limitations, noLeafDetected, preliminary } = useTranslation(PREVIEW_CONTENT)
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

            if (res.detected) {
                toast.success(leafDetected)
            } else {
                toast.error(noLeafDetected)
            }
        })
    }, [blob])

    const isAnalyzing = detectionResult === null
    const isLeafDetected = detectionResult?.detected ?? false

    return (
        <div className="flex flex-col h-full p-4">
            <PageHeader title={title} to={HOME_PAGE} />
            <div className="relative self-center mt-6">
                <img
                    src={imagePreview || undefined}
                    alt="Plant"
                    className="w-screen max-w-none h-1/3 relative left-1/2 -translate-x-1/2 max-h-[33vh] h-full object-cover"
                />
                <button className="absolute right-2 bottom-2 active:scale-110 hover:scale-110" onClick={onRetry}>
                    <FaArrowsRotate className="text-white" size={24} />
                </button>
            </div>
            <div className="mt-8">
                <h2 className="text-subheading">
                    {formTitle}
                </h2>
            </div>
            <p className="text-xs text-primary/50 italic my-1">
                {limitations}
            </p>
            <PreviewForm blob={blob} isAnalyzing={isAnalyzing} isLeafDetected={isLeafDetected} />
        </div>
    )
}
