import { fr, enGB, type Locale } from "date-fns/locale"

export const SUPPORTED_LANGUAGES = {
    FR: 'fr',
    EN: 'enGB'
} as const

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[keyof typeof SUPPORTED_LANGUAGES]

export const DATE_FNS_LOCALES: Record<SupportedLanguage, Locale> = {
    fr: fr,
    enGB: enGB
}

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
    fr: "Français",
    enGB: "English"
}

export type Translations<T> = Record<SupportedLanguage, T>
