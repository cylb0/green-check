import type { ReactNode } from "react"
import type { Translations } from "@/constants"

export const CAMERA_TOOLTIP: Translations<ReactNode> = {
    fr: <>Veuillez cadrer <br/>la feuille</>,
    en: <>Fit the leaf <br/>inside the box</>
}

interface PreviewContent {
    title: string
    formTitle: string
    limitations: string
    plantLabel: string
    soilLabel: string
    exposureLabel: string
    button: string
    loading: string
}

export const PREVIEW_CONTENT: Translations<PreviewContent> = {
    fr: {
        title: "Aperçu",
        formTitle: "Informations complémentaires (optionnel)",
        limitations: "*Seules les plantes listées sont supportées par le modèle.",
        plantLabel: "Sélectionner une espèce de plante",
        soilLabel: "Renseigner le type de sol",
        exposureLabel: "Renseigner le type d'exposition",
        button: "Envoyer",
        loading: "Chargement..."
    },
    en: {
        title: "Preview",
        formTitle: "Additional Details (optional)",
        limitations: "*Only listed plants are supported by the model.",
        plantLabel: "Select a plant species",
        soilLabel: "Indicate the soil type",
        exposureLabel: "Indicate the exposure type",
        button: "Submit",
        loading: "Loading..."
    }
}
