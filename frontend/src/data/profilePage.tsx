import type { ReactNode } from "react"
import type { IconType } from "react-icons"
import { FaRegUser } from "react-icons/fa";
import { TiCogOutline } from "react-icons/ti";
import { IoGlobeOutline } from "react-icons/io5";
import { GoInfo } from "react-icons/go";
import { PiSignOutBold } from "react-icons/pi";
import { TERMS_OF_USE_PAGE } from "../constants/pages";
import ChangePasswordForm from "../components/profile-page/ChangePasswordForm";

export const PROFILE_PAGE_TITLE = "Profile"

type MenuItemBase = {
    icon: IconType
    label: string
    chevron?: boolean
}

type CollapsibleMenu = MenuItemBase & { type: "collapsible", renderChildren: () => ReactNode }
type LanguageMenu = MenuItemBase & { type: "language" }
type LinkMenu = MenuItemBase & { type: "link", href: string }
type ActionMenu = MenuItemBase & { type: "action", actionKey: "logout" }

export type ProfilePageMenu = CollapsibleMenu | LanguageMenu | LinkMenu | ActionMenu

export const PROFILE_PAGE_MENU: ProfilePageMenu[] = [
    {
        type: "collapsible",
        icon: FaRegUser,
        label: "Personal information",
        renderChildren: () => (
            <>
                <ChangePasswordForm />
            </>
        ),
        chevron: true,
    },
    {
        type: "collapsible",
        icon: TiCogOutline,
        label: "Parameters",
        renderChildren: () => {},
        chevron: true,
    },
    {
        type: "language",
        icon: IoGlobeOutline,
        label: "Language",
        chevron: true,
    },
    {
        type: "link",
        icon: GoInfo,
        label: "About",
        href: TERMS_OF_USE_PAGE,
        chevron: true,
    },
    {
        type: "action",
        icon: PiSignOutBold,
        label: "Log out",
        actionKey: "logout"
    }
]
