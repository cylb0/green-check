import type { ReactNode } from "react"
import type { IconType } from "react-icons"
import { FaBookMedical, FaRegClock, FaRegHeart } from "react-icons/fa";
import { ADVICES_PAGE, ANALYZE_PAGE, GUIDES_PAGE, HISTORY_PAGE } from "./pages";

// ------

interface HeaderContent {
    readonly title: string
    readonly subtext: ReactNode
}

export const HEADER_CONTENT = {
    title: "Hello!",
    subtext: (
        <>
            Ready to start?
            <br/>
            What's the plan for today?
        </>
    )
} as const satisfies HeaderContent

export interface FeatureCardContent {
    readonly title: string
    readonly subtext: ReactNode
    readonly link: string
}

export const FEATURE_CARD: FeatureCardContent = {
    title: "Analyze a tree",
    subtext: "Use the camera to detect diseases",
    link: ANALYZE_PAGE
}

interface QuickAccessElement {
    readonly icon: IconType
    readonly label: string
    readonly link: string
}

export interface QuickAccessContent {
    readonly title: string
    readonly content: readonly QuickAccessElement[]
}

export const QUICK_ACCESS_CONTENT = {
    title: "Quick access",
    content: [
        { icon: FaRegClock, label: "History", link: HISTORY_PAGE  },
        { icon: FaBookMedical, label: "Diseases guides", link: GUIDES_PAGE },
        { icon: FaRegHeart, label: "Advices", link: ADVICES_PAGE },
    ]
} as const satisfies QuickAccessContent

interface StatsSectionElement {
    readonly label: string
}

export interface StatsSectionContent {
    readonly title: string
    readonly content: readonly StatsSectionElement[]
}

export const STATS_SECTION_CONTENT = {
    title: "Statistics",
    content: [
        { label: "Analysis" },
        { label: "Alerts" },
        { label: "Accuracy" },
    ]
} as const satisfies StatsSectionContent