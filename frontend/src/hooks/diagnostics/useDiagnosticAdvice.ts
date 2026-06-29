import { apiFetch } from "@/api"
import { useQuery } from "@tanstack/react-query"
import { useLanguage } from "@/context"
import type { Advice } from "@/types"
import { API_DIAGNOSTICS } from "@/constants"

export function useDiagnosticAdvice(diagnosticId: string | undefined) {
    const { language } = useLanguage()

    return useQuery({
        queryKey: ["diagnostic-advice", diagnosticId, language],
        queryFn: () =>
            apiFetch<Advice>(`${API_DIAGNOSTICS}/${diagnosticId}/advice`, { language }),
        enabled: !!diagnosticId,
    })
}
