import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface Metadata {
    plant: { value: string, label: string }[]
    exposure: { value: string, label: string }[]
    soil: { value: string, label: string }[]
    disease: { value: string, label: string }[]
}

const MetadataContext = createContext<Metadata | null>(null)

export const MetadataProvider = ({ children }: { children: ReactNode }) => {
    const [metadata, setMetadata] = useState<Metadata | null>(null)

    useEffect(() => {
        fetch('/api/metadata')
            .then(res => res.json())
            .then(data => setMetadata(data))
            .catch(err => console.error("Error fetching metadata: ", err))
    }, [])

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
