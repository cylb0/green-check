import apiFetch from "../api/client"
import type { Advice } from "../types/diagnostics"
import { useQuery } from "@tanstack/react-query"

export function useDiagnosticAdvice(diagnosticId: string | undefined) {
    return useQuery({
        queryKey: ["diagnostic-advice", diagnosticId],
        queryFn: () =>
            apiFetch<Advice>(`/api/diagnostics/${diagnosticId}/advice`),
        enabled: !!diagnosticId,
    })
}
