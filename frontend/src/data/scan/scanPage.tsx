import type { ReactNode } from "react"
import type { Translations } from "@/constants"

export const CAMERA_TOOLTIP: Translations<ReactNode> = {
    fr: <>Veuillez cadrer <br/>la feuille</>,
    en: <>Fit the leaf <br/>inside the box</>
}

interface PreviewContent {
    buttonAnalyzing: string
    buttonContinueAnyway: string
    buttonLoading: string
    buttonSubmit: string
    exposureLabel: string
    formTitle: string
    leafDetected: string
    limitations: string
    noLeafDetected: string
    plantLabel: string
    preliminary: string
    soilLabel: string
    title: string
    warning: string
}

export const PREVIEW_CONTENT: Translations<PreviewContent> = {
    fr: {
        buttonAnalyzing: "Analyse en cours...",
        buttonContinueAnyway: "Continuer quand même",
        buttonLoading: "Chargement...",
        buttonSubmit: "Envoyer",
        exposureLabel: "Renseigner le type d'exposition",
        formTitle: "Informations complémentaires (optionnel)",
        leafDetected: "Feuille détectée",
        limitations: "*Seules les plantes listées sont supportées par le modèle.",
        noLeafDetected: "Aucune feuille détectée",
        plantLabel: "Sélectionner une espèce de plante",
        preliminary: 'Analyse préliminaire...',
        soilLabel: "Renseigner le type de sol",
        title: "Aperçu",
        warning: "Aucune feuille détectée. Le modèle peut se tromper — vous pouvez continuer, mais le résultat sera peut-être moins précis.",
    },
    en: {
        buttonAnalyzing: "Analyzing...",
        buttonContinueAnyway: "Continue anyway",
        buttonLoading: "Loading...",
        buttonSubmit: "Submit",
        exposureLabel: "Indicate the exposure type",
        formTitle: "Additional Details (optional)",
        leafDetected: "Leaf detected",
        limitations: "*Only listed plants are supported by the model.",
        noLeafDetected: "No leaf detected",
        plantLabel: "Select a plant species",
        preliminary: "Running preliminary check...",
        soilLabel: "Indicate the soil type",
        title: "Preview",
        warning: "No leaf detected. The model isn't always right — you can continue, but the result may be less accurate.",
    }
}
