import type { Translations } from "../constants/languages"

interface DiagnosticTranslation{
    title: string
    messages: string[]
}

export const DIAGNOSTIC_PAGE_CONTENT: Translations<DiagnosticTranslation> = {
    fr: {
        title: "Analyse en cours...",
        messages: [
            "Analyse des caractéristiques de la plante...",
            "Détection des motifs...",
            "Analyse des couleurs...",
            "Comparaison avec les modèles...",
            "Evaluation de la sévérité..."
        ] 
    },
    en: {
        title: "Analyzing...",
        messages: [
            "Analyzing plant features...",
            "Detecting patterns...",
            "Analyzing colors...",
            "Comparing to model...",
            "Evaluating severity..."
        ]
    }
}

interface DiagnosticResultTranslation {
    title: string
    confidence: string
    severity: string
    healthy: string
    seeRecommendations: string
    newDiagnostic: string
}

export const DIAGNOSTIC_RESULT_PAGE_CONTENT: Translations<DiagnosticResultTranslation> = {
    fr: {
        title: "Résultats",
        confidence: "Confiance",
        severity: "Sevérité",
        seeRecommendations: "Voir les recommandations",
        healthy: "Sain",
        newDiagnostic: "Nouveau diagnostic"  
    },
    en: {
        title: "Results",
        confidence: "Confidence",
        severity: "Severity",
        seeRecommendations: "See Recommendations",
        healthy: "Healthy",
        newDiagnostic: "New diagnostic"
    }
}

interface DiagnosticAdvicePageContent {
    title: string
    treatments: string
    advice: string
}

export const DIAGNOSTIC_ADVICE_PAGE_CONTENT = {
    title: "Action Plan",
    treatments: "Suggested treatments", 
    advice: "Care Tips"
} as const satisfies DiagnosticAdvicePageContent