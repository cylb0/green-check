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
}

export default function ActionButton({
    label,
    type = "button",
    onClick,
    borderColor = "border-foreground/20",
    textColor = "text-foreground/80",
    bgColor = "bg-transparent",
    hoverColor = "active:bg-foreground/5 hover:bg-foreground/5",
    icon: Icon,
    iconSide = "left",
    disabled = false
}: ActionButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`w-full font-bold border rounded-lg p-2 mt-4 transition-all duration-200
                flex items-center justify-center gap-2
                active:scale-95 hover:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disable:hover:scale-100
                ${borderColor} ${textColor} ${bgColor} ${hoverColor}`}
        >
            {Icon && iconSide === "left" && <Icon size={20} />}
            <span>{label}</span>
            {Icon && iconSide === "right" && <Icon size={20} />}
        </button>
    )
}