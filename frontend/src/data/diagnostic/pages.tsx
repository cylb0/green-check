import type { Translations } from "@/constants"

interface DiagnosticProcessingTranslation{
    title: string
    messages: string[]
}

export const DIAGNOSTIC_PAGE_CONTENT: Translations<DiagnosticProcessingTranslation> = {
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

interface ResultCardTranslation {
    title: string
    text: string
}

interface ResultHealthyTranslation {
    title: string
    label: string
    card: ResultCardTranslation
}

export const RESULT_HEALTHY: Translations<ResultHealthyTranslation> = {
    fr: {
        title: "Plante en bonne santé",
        label: "・ aucune maladie détectée",
        card: {
            title: "Tout va bien",
            text: "Continuez à surveiller régulièrement votre plante pour prévenir toute apparition"
        }
    },
    en: {
        title: "Healthy plant",
        label: "・ no disease detected",
        card: {
            title: "Everything is fine",
            text: "Keep monitoring your plant regularly to prevent any appearance"
        }
    }
}

export const RESULT_LOW_CONFIDENCE_DISEASE_CARD: Translations<ResultCardTranslation> = {
    fr: {
        title: "Résultat incertain",
        text: "Le modèle n'est pas assez confiant. Ce diagnostic est indicatif -- consultez un expert avant d'agir."
    },
    en: {
        title: "Uncertain result",
        text: "The model is not confident. This diagnostic is indicative -- consult an expert before acting"
    }
}

export const RESULT_NO_ADVICE_DISEASE_CARD: Translations<ResultCardTranslation> = {
    fr: {
        title: "Recommendations indisponibles",
        text: "Ce diagnostic n'est pas encore couvert par notre base de conseils -- consultez un expert avant d'agir.",
    },
    en: {
        title: "No recommendations yet",
        text: "This diagnosis isn't covered by our advice database yet -- consult an expert before acting.",
    }
}

export const CONFIDENCE: Translations<string> = {
    fr: "Confiance",
    en: "Confidence"
}

interface ResultButtonsTranslation {
    newScan: string
    seeRecommendations: string
}

export const RESULT_BUTTONS: Translations<ResultButtonsTranslation> = {
    fr: {
        newScan: "Nouvelle analyse",
        seeRecommendations: "Voir les recommandations"
    },
    en: {
        newScan: "New scan",
        seeRecommendations: "See recommendations"
    }
}

export const SEVERITY: Translations<string> = {
    fr: "Gravité",
    en: "Severity"
}

export const RESULTS_PAGE_NAME: Translations<string> = {
    fr: "Résultats",
    en: "Diagnostic"
}

interface DiagnosticAdvicePageTranslation {
    treatments: string
    advice: string
}

export const DIAGNOSTIC_ADVICE_PAGE_NAME: Translations<string> = {
    fr: "Plan d'action",
    en: "Action plan",
}

export const DIAGNOSTIC_ADVICE_PAGE_CONTENT: Translations<DiagnosticAdvicePageTranslation> = {
    fr: {
        treatments: "Traitements suggérés",
        advice: "Conseils d'entretien"
    },
    en: {
        treatments: "Suggested treatments",
        advice: "Care Tips"
    }
}

export const RESULTS_ERROR_PAGE_NAME: Translations<string> = {
    fr: "Erreur",
    en: "Error"
}

interface DiagnosticErrorPageTranslation {
    message: string
    retry: string
}

export const DIAGNOSTIC_ERROR_PAGE_CONTENT: Translations<DiagnosticErrorPageTranslation> = {
    fr: {
        message: "L'analyse n'a pas pu être réalisée. Veuillez réessayer.",
        retry: "Réessayer",
    },
    en: {
        message: "The analysis could not be completed. Please try again.",
        retry: "Try again",
    }
}
