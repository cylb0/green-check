import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "../constants/languages"

const STORAGE_KEY = 'app_language'

type LanguageContextType = {
    language: SupportedLanguage
    setLanguage: (lang: SupportedLanguage) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<SupportedLanguage>(() => {
        const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage
        return Object.values(SUPPORTED_LANGUAGES).includes(saved) ? saved : SUPPORTED_LANGUAGES.EN
    })
    
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, language)
    }, [language])

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) throw new Error('useLanguage must be used within an LanguageProvider')
    return context
}
