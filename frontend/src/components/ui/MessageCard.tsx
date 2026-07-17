import type { IconType } from "react-icons";

type MessageVariant = "success" | "warning" | "neutral"

interface MessageCardProps {
    icon?: IconType
    title: string
    message: string
    variant?: MessageVariant
    className?: string
}

const VARIANT_STYLES: Record<MessageVariant, string> = {
    success: "bg-severity-low-bg text-severity-low-text",
    warning: "bg-severity-moderate-bg text-severity-moderate-text",
    neutral: "bg-paper/50 backdrop-blur-md border border-paper/60 text-ink-600",
}

export default function MessageCard({ icon: Icon, title, message, variant = "neutral", className = "" }: MessageCardProps) {
    return (
        <div className={`flex gap-3 p-3 rounded-2xl ${VARIANT_STYLES[variant]} ${className}`}>
            {Icon && <Icon size={20} className="flex-shrink-0 mt-0.5" />}
            <div className="flex flex-col gap-0.5">
                <p className="text-sm font-bold">{title}</p>
                <p className="text-xs font-medium opacity-90">{message}</p>
            </div>
        </div>
    )
}
