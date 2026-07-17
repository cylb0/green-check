import type { Translations } from "@/constants"

export const HISTORY_TITLE: Translations<string> = {
    fr: "Historique",
    en: "History",
}

export const SEARCH_BAR_PLACEHOLDER: Translations<string> = {
    fr: "Rechercher...",
    en: "Search...",
}

interface DiagnosticCardStatusTranslation {
    label: string
    hint: string
}

interface DiagnosticCardStatusesTranslation {
    error: DiagnosticCardStatusTranslation
    pending: DiagnosticCardStatusTranslation
}

export const DIAGNOSTIC_CARD_STATUS: Translations<DiagnosticCardStatusesTranslation> = {
    fr: {
        error: {
            label: "Analyse échouée",
            hint: "L'analyse n'a pas abouti"
        },
        pending: {
            label: "En cours",
            hint: "Analyse en cours..."
        }
    },
    en: {
        error: {
            label: "Analysis failed",
            hint: "The analysis did not complete"
        },
        pending: {
            label: "In progress",
            hint: "Analyzing..."
        }
    }
}