import type { IconType } from "react-icons";

interface MenuIconProps {
    icon: IconType
    size?: number
    className?: string
}

export default function MenuIcon({ icon: Icon, size = 18, className = "text-parchment-400" }: MenuIconProps) {
    return <Icon size={size} className={`shrink-0 ${className}`} />
}
