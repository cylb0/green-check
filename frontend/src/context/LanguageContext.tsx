import { createContext, useContext, useState, type ReactNode } from "react"
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "../constants/languages"

type LanguageContextType = {
    language: SupportedLanguage
    setLanguage: (lang: SupportedLanguage) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<SupportedLanguage>(SUPPORTED_LANGUAGES.EN)
    
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
