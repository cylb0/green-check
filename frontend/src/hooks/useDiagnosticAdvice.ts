import apiFetch from "../api/client"
import { API_DIAGNOSTICS } from "../constants/api"
import type { Advice } from "../types/diagnostics"
import { useQuery } from "@tanstack/react-query"

export function useDiagnosticAdvice(diagnosticId: string | undefined) {
    return useQuery({
        queryKey: ["diagnostic-advice", diagnosticId],
        queryFn: () =>
            apiFetch<Advice>(`${API_DIAGNOSTICS}/${diagnosticId}/advice`),
        enabled: !!diagnosticId,
    })
}
