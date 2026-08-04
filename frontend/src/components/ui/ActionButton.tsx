import type { IconType } from "react-icons"

interface ActionButtonProps {
    label: string
    type?: "button" | "submit" | "reset"
    onClick?: () => void
    borderColor?: string
    textColor?: string
    bgColor?: string
    hoverColor?: string
    icon?: IconType
    iconSide?: "left" | "right"
    disabled?: boolean
    className?: string
}

export default function ActionButton({
    label,
    type = "button",
    onClick,
    borderColor = "border-on-primary/20",
    textColor = "text-on-primary/80",
    bgColor = "bg-transparent",
    hoverColor = "active:bg-on-primary/5 hover:bg-on-primary/5",
    icon: Icon,
    iconSide = "left",
    disabled = false,
    className = ""
}: ActionButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`w-full font-bold border rounded-full p-2 transition duration-200
                flex items-center justify-center gap-2
                hover:-translate-y-0.5 active:translate-y-0 active:scale-95 
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100
                ${borderColor} ${textColor} ${bgColor} ${hoverColor} ${className}`}
        >
            {Icon && iconSide === "left" && <Icon size={20} />}
            <span>{label}</span>
            {Icon && iconSide === "right" && <Icon size={20} />}
        </button>
    )
}