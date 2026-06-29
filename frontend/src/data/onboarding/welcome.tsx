import type { ReactNode } from "react";
import type { Translations } from "@/constants";

interface LandingPageTranslation {
    title: ReactNode
    catchphrase: ReactNode
    buttonLabel: string
}

export const LANDING_PAGE_CONTENT: Translations<LandingPageTranslation> = {
    fr : {
        title: <>Détecteur de<br/>plantes malades</>,
        catchphrase: <>Prenez soin de vos plantes,<br/>la nature vous remerciera</>,
        buttonLabel: "Commencer"
    },
    en: {
        title: <>Plant disease<br/>Detection</>,
        catchphrase: <>Take care of your plants,<br/> nature will thank you</>,
        buttonLabel: "Get started"
    }
}
