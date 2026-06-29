import apiFetch from "../../api/client"
import { useQuery } from "@tanstack/react-query"
import { API_DIAGNOSTICS } from "../../constants"
import type { Advice } from "../../types"
import { useLanguage } from "../../context"

export function useDiagnosticAdvice(diagnosticId: string | undefined) {
    const { language } = useLanguage()

    return useQuery({
        queryKey: ["diagnostic-advice", diagnosticId, language],
        queryFn: () =>
            apiFetch<Advice>(`${API_DIAGNOSTICS}/${diagnosticId}/advice`, { language }),
        enabled: !!diagnosticId,
    })
}
