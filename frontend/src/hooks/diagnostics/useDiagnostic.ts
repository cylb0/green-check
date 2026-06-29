import { useQuery } from "@tanstack/react-query"
import { API_DIAGNOSTICS } from "@/constants";
import { apiFetch } from "@/api";
import type { Diagnostic } from "@/types";

export function useDiagnostic(diagnosticId: string | undefined) {
    return useQuery({
        queryKey: ["diagnostic", diagnosticId],
        queryFn: () =>
            apiFetch<Diagnostic>(`${API_DIAGNOSTICS}/${diagnosticId}`),
        enabled: !!diagnosticId,
    })
}
