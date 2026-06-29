import type { ReactNode } from "react"
import type { IconType } from "react-icons"
import { FaBookMedical, FaRegClock, FaRegHeart } from "react-icons/fa";
import { ADVICE_PAGE, GUIDES_PAGE, HISTORY_PAGE, SCAN_PAGE, type Translations } from "../../constants";

interface HeaderTranslation {
    readonly title: string
    readonly subtext: ReactNode
}

export const HEADER_TRANSLATIONS: Translations<HeaderTranslation> = {
    fr: {
        title: "Bonjour !",
        subtext: (
            <>
                Que souhaitez-vous faire
                <br/>
                Aujourd'hui ?
            </>
        )
    },
    en: {
        title: "Hello!",
        subtext: (
            <>
                Ready to start?
                <br/>
                What's the plan for today?
            </>
        )
    }
}

interface FeatureCardTranslation {
    readonly title: string
    readonly subtext: string
}

export const FEATURE_CARD_TRANSLATIONS: Translations<FeatureCardTranslation> = {
    fr: {
        title: "Analiser une plante",
        subtext: "Utilisez la caméra pour détecter les maladies",
    },
    en: {
        title: "Analyze a tree",
        subtext: "Use the camera to detect diseases",
    }
}

export const FEATURE_CARD_LINK = SCAN_PAGE

interface QuickAccessTranslation {
    readonly title: string
    readonly labels: {
        history: string
        guides: string
        advice: string
    }
}

type QuickAccessKey = "history" | "guides" | "advice"

export const QUICK_ACCESS_TRANSLATIONS: Translations<QuickAccessTranslation> = {
    fr: {
        title: "Accès rapide",
        labels: {
            history: "Historique",
            guides: "Guide des maladies",
            advice: "Conseils"
        }
    },
    en: {
        title: "Quick Access",
        labels: {
            history: "History",
            guides: "Diseases guides",
            advice: "Advice"
        }
    }
}

interface QuickAccessStatic {
    readonly icon: IconType
    readonly link: string
}

export const QUICK_ACCESS_CONFIG: Record<QuickAccessKey, QuickAccessStatic> = {
    history: { icon: FaRegClock, link: HISTORY_PAGE },
    guides: { icon: FaBookMedical, link: GUIDES_PAGE },
    advice: { icon: FaRegHeart, link: ADVICE_PAGE }
}

export const STATS_CONFIG = {
    analysis: {},
    alerts: {},
    accuracy: {}
}

export type StatsKey = keyof typeof STATS_CONFIG

export const STATS_TRANSLATIONS: Translations<{
    title: string
    labels: Record<StatsKey, string>
}> = {
    fr: {
        title: "Statistiques",
        labels: {
            analysis: "Analyses",
            alerts: "Alertes",
            accuracy: "Précision"
        }
    },
    en: {
        title: "Statistics",
        labels: {
            analysis: "Analysis",
            alerts: "Alerts",
            accuracy: "Accuracy"
        }
    }
}
