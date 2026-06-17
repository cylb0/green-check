import type { IconType } from "react-icons";

interface MenuIconProps {
    icon: IconType
    size?: number
}

export default function MenuIcon({ icon: Icon, size = 24 }: MenuIconProps) {
    return <Icon size={size} className="text-primary active:text-primary/80 shrink-0" />
}
