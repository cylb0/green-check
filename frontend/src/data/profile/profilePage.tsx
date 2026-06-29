import type { ReactNode } from "react"
import { ChangePasswordForm } from "@/components";
import { TERMS_OF_USE_PAGE, type Translations } from "@/constants";
import type { IconType } from "react-icons"
import { FaRegUser } from "react-icons/fa";
import { TiCogOutline } from "react-icons/ti";
import { IoGlobeOutline } from "react-icons/io5";
import { GoInfo } from "react-icons/go";
import { PiSignOutBold } from "react-icons/pi";

export const PROFILE_PAGE_TITLE: Translations<string> = {
    fr: "Profil",
    en: "Profile"
}

type ProfileLabelKey =
    | "personalInformation"
    | "settings"
    | "language"
    | "about"
    | "logout"

export const PROFILE_PAGE_LABELS: Translations<Record<ProfileLabelKey, string>> = {
    fr: {
        personalInformation: "Informations personnelles",
        settings: "Paramètres",
        language: "Langue",
        about: "À propos",
        logout: "Déconnexion"
    },
    en: {
        personalInformation: "Personal Information",
        settings: "Settings",
        language: "Language",
        about: "About",
        logout: "Log out"
    }
}

type MenuItemBase = {
    icon: IconType
    labelKey: ProfileLabelKey
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
        labelKey: "personalInformation",
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
        labelKey: "settings",
        renderChildren: () => {},
        chevron: true,
    },
    {
        type: "language",
        icon: IoGlobeOutline,
        labelKey: "language",
        chevron: true,
    },
    {
        type: "link",
        icon: GoInfo,
        labelKey: "about",
        href: TERMS_OF_USE_PAGE,
        chevron: true,
    },
    {
        type: "action",
        icon: PiSignOutBold,
        labelKey: "logout",
        actionKey: "logout"
    }
]
