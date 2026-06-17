import { format, isToday, isYesterday, parseISO } from "date-fns"
import { type SupportedLanguage, DATE_FNS_LOCALES } from "../constants/languages"

const TERMS: Record<SupportedLanguage, { today: string, yesterday: string }> = {
    fr: { today: "Aujourd'hui", yesterday: "Hier" },
    enGB: { today: "Today", yesterday: "Yesterday" }
}

export const formatDiagnosticDate = (isoDate: string, lang: SupportedLanguage = 'enGB') => {
    const date = parseISO(isoDate)
    
    const locale = DATE_FNS_LOCALES[lang]
    const terms = TERMS[lang]

    if (isToday(date)) return terms.today
    if (isYesterday(date)) return terms.yesterday

    return format(date, "d MMMM", { locale })
}
