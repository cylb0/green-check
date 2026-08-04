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
    success: "bg-severity-low-dark-bg text-severity-low-dark-text",
    warning: "bg-severity-moderate-dark-bg text-severity-moderate-dark-text",
    neutral: "glass text-ink-inverse",
}

export default function MessageCard({ icon: Icon, title, message, variant = "neutral", className = "" }: MessageCardProps) {
    return (
        <div className={`flex gap-3 p-3 rounded-card ${VARIANT_STYLES[variant]} ${className}`}>
            {Icon && <Icon size={20} className="flex-shrink-0 mt-1" />}
            <div className="flex flex-col gap-0.5">
                <p className="body-strong">{title}</p>
                <p className="label opacity-90">{message}</p>
            </div>
        </div>
    )
}
