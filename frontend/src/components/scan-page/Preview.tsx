import { useEffect, useState } from "react"
import { FaArrowsRotate } from "react-icons/fa6";
import PreviewForm from "./PreviewForm";
import { PREVIEW_CONTENT } from "../../data/scanPage";
import { useTranslation } from "../../hooks/useTranslation";
import { HOME_PAGE } from "../../constants/pages";
import PageHeader from "../ui/PageHeader";

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
                <img className="rounded-lg" src={imagePreview} />
                <button className="absolute right-2 bottom-2 active:scale-110 hover:scale-110" onClick={onRetry}>
                    <FaArrowsRotate className="text-white" size={24} />
                </button>
            </div>
            <div className="mt-8 mb-4">
                <h2 className="text-subheading">
                    {formTitle}
                </h2>
            </div>
            <p className="text-xs text-primary/50 italic my-2">
                {limitations}
            </p>
            <PreviewForm blob={blob} />
        </div>
    )
}
