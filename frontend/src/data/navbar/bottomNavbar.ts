import type { IconType } from "react-icons";
import { HISTORY_PAGE, HOME_PAGE, PROFILE_PAGE, SCAN_PAGE, type Translations } from "@/constants";
import { IoHomeSharp, IoHomeOutline } from "react-icons/io5";
import { FaClock, FaRegClock, FaRegUser, FaUser } from "react-icons/fa6";
import { IoCameraOutline } from "react-icons/io5";

type NavLabelKey =
    | "home"
    | "camera"
    | "history"
    | "profile"

export const BOTTOM_NAV_LABELS: Translations<Record<NavLabelKey, string>> = {
    fr: {
        "camera": "Caméra",
        "history": "Historique",
        "home": "Accueil",
        "profile": "Profil",
    },
    en: {
        "camera": "Camera",
        "home": "Home",
        "history": "History",
        "profile": "Profile",
    }
}

export interface NavItem {
    readonly id: string
    readonly labelKey: NavLabelKey
    readonly icon: IconType
    readonly activeIcon?: IconType
}

export const NAV_ITEMS = [
    { id: HOME_PAGE, labelKey: "home", icon: IoHomeOutline, activeIcon: IoHomeSharp },
    { id: SCAN_PAGE, labelKey: "camera", icon: IoCameraOutline },
    { id: HISTORY_PAGE, labelKey: "history", icon: FaRegClock, activeIcon: FaClock },
    { id: PROFILE_PAGE, labelKey: "profile", icon: FaRegUser, activeIcon: FaUser }
] as const satisfies readonly NavItem[]
