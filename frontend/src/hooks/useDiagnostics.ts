import { useEffect, useState } from "react";
import type { Diagnostic } from "../types/diagnostics";
import apiFetch from "../api/client";
import { useLanguage } from "../context/LanguageContext";

export function useDiagnostics() {
    const [data, setData] = useState<Diagnostic[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { language } = useLanguage()

    useEffect(() => {
        const fetchDiagnostics = async () => {
            try {
                setIsLoading(true)
                setError(null)

                const result = await apiFetch<Diagnostic[]>(
                    `/api/diagnostics`,
                    { language: language }
                )
                setData(result)
            } catch (err) {
                setError("An error occurred while fetching the diagnostic data.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchDiagnostics()
    }, [language])
    
    return { data, isLoading, error }
}