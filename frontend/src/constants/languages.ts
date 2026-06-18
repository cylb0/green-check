import { fr, enGB as en, type Locale } from "date-fns/locale"

export const SUPPORTED_LANGUAGES = {
    FR: 'fr',
    EN: 'en'
} as const

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[keyof typeof SUPPORTED_LANGUAGES]

export const DATE_FNS_LOCALES: Record<SupportedLanguage, Locale> = {
    fr: fr,
    en: en
}

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
    fr: "Français",
    en: "English"
}

export type Translations<T> = Record<SupportedLanguage, T>
