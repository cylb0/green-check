import type { Translations } from "../constants/languages";
import { useLanguage } from "../context/LanguageContext";

export function useTranslation<T>(translations: Translations<T>): T {
    const { language } = useLanguage()
    return translations[language]
}
