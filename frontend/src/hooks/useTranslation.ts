import type { Translations } from "../constants";
import { useLanguage } from "../context";

export function useTranslation<T>(translations: Translations<T>): T {
    const { language } = useLanguage()
    return translations[language]
}
