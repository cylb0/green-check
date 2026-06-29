import type { IconType } from "react-icons";

interface MessageCardProps {
    icon?: IconType
    title: string
    message: string
    className?: string
}

export default function MessageCard({ icon: Icon, title, message, className }: MessageCardProps) {
    return (
        <div className={`flex p-2 rounded-lg gap-2 ${className}`}>
            {Icon && (
                <Icon size={32} />
            )}
            <div className="flex flex-col">
                <p className="font-semibold">{title}</p>
                <p>{message}</p>
            </div>
        </div>
    )
}
