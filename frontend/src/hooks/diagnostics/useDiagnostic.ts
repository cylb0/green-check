import { useQuery } from "@tanstack/react-query"
import { API_DIAGNOSTICS } from "@/constants";
import { apiFetch } from "@/api";
import type { Diagnostic } from "@/types";
import { useLanguage } from "@/context";

export function useDiagnostic(diagnosticId: string | undefined) {
    const { language } = useLanguage()
    
    return useQuery({
        queryKey: ["diagnostic", diagnosticId, language],
        queryFn: () =>
            apiFetch<Diagnostic>(`${API_DIAGNOSTICS}/${diagnosticId}`, { language }),
        enabled: !!diagnosticId,
    })
}
