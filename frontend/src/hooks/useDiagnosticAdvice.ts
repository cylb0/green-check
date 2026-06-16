import { useEffect, useState } from "react"
import apiFetch from "../api/client"
import type { Advice } from "../types/diagnostics"

export function useDiagnosticAdvice(diagnosticId: string | undefined) {
    const [data, setData] = useState<Advice | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!diagnosticId) return

        const fetchDiagnosticAdvice = async () => {
            try {
                setIsLoading(true)
                const result = await apiFetch<Advice>(`/api/diagnostics/${diagnosticId}/advice`)
                setData(result)
            } catch {
                setError("An error occurred while fetching the diagnostic data.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchDiagnosticAdvice()
    }, [diagnosticId])

    return { data, isLoading, error }
}
