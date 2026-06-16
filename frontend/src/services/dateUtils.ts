import { format, isToday, isYesterday, parseISO, type Locale } from "date-fns"
import { fr, enGB } from "date-fns/locale"

const LOCALES: Record<string, any> = { fr, enGB }

const TERMS: Record<string, { today: string, yesterday: string }> = {
    fr: { today: "Aujourd'hui", yesterday: "Hier" },
    enGB: { today: "Today", yesterday: "Yesterday" }
}

export const formatDiagnosticDate = (isoDate: string, lang: 'fr' | 'enGB' = 'enGB') => {
    const date = parseISO(isoDate)
    const locale = LOCALES[lang]
    const terms = TERMS[lang]

    if (isToday(date)) return terms.today
    if (isYesterday(date)) return terms.yesterday

    return format(date, "d MMMM", { locale })
}
