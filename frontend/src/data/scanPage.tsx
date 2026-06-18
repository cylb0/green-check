import type { Translations } from "../constants/languages"

export const CAMERA_TOOLTIP = <>Fit the leaf <br/>inside the box</>

interface PreviewContent {
    title: string
    formTitle: string
    limitations: string
}

export const PREVIEW_CONTENT: Translations<PreviewContent> = {
    fr: {
        title: "Preview",
        formTitle: "Additional Details (optional)",
        limitations: "Only listed plants are supported by the model."
    },
    en: {
        title: "Preview",
        formTitle: "Additional Details (optional)",
        limitations: "Only listed plants are supported by the model."
    }
}
