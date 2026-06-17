import type { ReactNode } from "react";
import type { Translations } from "../constants/languages";

type LandingPageContentKey =
    | "title"
    | "catchphrase"

export const LANDING_PAGE_CONTENT: Translations<Record<LandingPageContentKey, ReactNode>> = {
    fr : {
        title: <>Détecteur de<br/>plantes malades</>,
        catchphrase: <>Prenez soin de vos plantes,<br/>la nature vous remerciera</>
    },
    enGB: {
        title: <>Plant disease<br/>Detection</>,
        catchphrase: <>Take care of your plants,<br/> nature will thank you</>
    }
}