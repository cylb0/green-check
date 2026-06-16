import { useEffect, useState } from "react";
import type { Diagnostic } from "../types/diagnostics";
import apiFetch from "../api/client";

export function useDiagnostic(diagnosticId: string | undefined) {
    const [data, setData] = useState<Diagnostic | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!diagnosticId) return

        const fetchDiagnostic = async () => {
            try {
                setIsLoading(true)
                const result = await apiFetch<Diagnostic>(`/api/diagnostics/${diagnosticId}`)
                setData(result)
            } catch (err) {
                setError("An error occurred while fetching the diagnostic data.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchDiagnostic()
    }, [diagnosticId])
    
    return { data, isLoading, error }
}