import { useEffect, useState } from "react"
import { FaArrowsRotate } from "react-icons/fa6";
import { PREVIEW_CONTENT } from "../../data";
import { useTranslation } from "../../hooks";
import { HOME_PAGE } from "../../constants";
import { PageHeader, PreviewForm } from "..";

interface PreviewProps {
    blob: Blob
    onRetry: () => void
}

export default function Preview({ blob, onRetry }: PreviewProps) {
    const [imagePreview, setImagePreview] = useState("")
    const { title, formTitle, limitations } = useTranslation(PREVIEW_CONTENT)

    useEffect(() => {
        const url = URL.createObjectURL(blob)
        setImagePreview(url)
        return () => URL.revokeObjectURL(url)
    }, [blob])

    return (
        <div className="flex flex-col h-full p-4">
            <PageHeader title={title} to={HOME_PAGE} />
            <div className="relative self-center mt-6">
                <img
                    src={imagePreview}
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
            <PreviewForm blob={blob} />
        </div>
    )
}
