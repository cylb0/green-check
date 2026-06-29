import type { IconType } from "react-icons";
import { FaClock, FaRegClock, FaRegUser, FaUser } from "react-icons/fa6";
import { IoHomeSharp, IoHomeOutline } from "react-icons/io5";
import { HISTORY_PAGE, HOME_PAGE, PROFILE_PAGE } from "../../constants/pages";

export interface NavItem {
    readonly id: string
    readonly label: string
    readonly icon: IconType
    readonly activeIcon: IconType
}

export const NAV_ITEMS = [
    { id: HOME_PAGE, label: "Home", icon: IoHomeOutline, activeIcon: IoHomeSharp },
    { id: HISTORY_PAGE, label: "History", icon: FaRegClock, activeIcon: FaClock },
    { id: PROFILE_PAGE, label: "Profile", icon: FaRegUser, activeIcon: FaUser }
] as const satisfies readonly NavItem[]
