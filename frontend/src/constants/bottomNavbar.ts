import type { IconType } from "react-icons";
import { FaClock, FaRegClock, FaRegUser, FaUser } from "react-icons/fa6";
import { IoHomeSharp, IoHomeOutline } from "react-icons/io5";

export interface NavItem {
    readonly id: string
    readonly label: string
    readonly icon: IconType
    readonly activeIcon: IconType
}

export const NAV_ITEMS = [
    { id: "home", label: "Home", icon: IoHomeOutline, activeIcon: IoHomeSharp },
    { id: "history", label: "History", icon: FaRegClock, activeIcon: FaClock },
    { id: "profile", label: "Profile", icon: FaRegUser, activeIcon: FaUser }
] as const satisfies readonly NavItem[]
