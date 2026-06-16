import { useEffect, useState } from "react";
import type { Diagnostic } from "../types/diagnostics";
import apiFetch from "../api/client";

export function useDiagnostics() {
    const [data, setData] = useState<Diagnostic[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchDiagnostics = async () => {
            try {
                setIsLoading(true)
                const result = await apiFetch<Diagnostic[]>(`/api/diagnostics`)
                setData(result)
            } catch (err) {
                setError("An error occurred while fetching the diagnostic data.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchDiagnostics()
    }, [])
    
    return { data, isLoading, error }
}