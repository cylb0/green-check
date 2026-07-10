import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { useLanguage } from "./LanguageContext"

interface Metadata {
    plant: { value: string, label: string }[]
    exposure: { value: string, label: string }[]
    soil: { value: string, label: string }[]
    disease: { value: string, label: string }[]
    diagnostic_status: { value: string, label: string }[]
}

const MetadataContext = createContext<Metadata | null>(null)

export const MetadataProvider = ({ children }: { children: ReactNode }) => {
    const [metadata, setMetadata] = useState<Metadata | null>(null)
    const { language } = useLanguage()
    const isFirstLoad = useRef(true)

    useEffect(() => {
        fetch('/api/metadata', {
            headers: {
                'Accept-Language': language
            }
        })
            .then(res => res.json())
            .then(data => {
                setMetadata(data)
                isFirstLoad.current = false
            })
            .catch(err => console.error("Error fetching metadata: ", err))
    }, [language])

    if (isFirstLoad.current && !metadata) {
        return <div>Loading...</div>
    }

    return (
        <MetadataContext.Provider value={metadata}>
            {children}
        </MetadataContext.Provider>
    )
}

export function useMetadata() {
    const context = useContext(MetadataContext)
    if (!context) throw new Error('useMetadata must be used within an MetadataProvider')
    return context
}
