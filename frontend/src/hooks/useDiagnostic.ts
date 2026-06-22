import type { Diagnostic } from "../types/diagnostics";
import apiFetch from "../api/client";
import { useQuery } from "@tanstack/react-query"
import { API_DIAGNOSTICS } from "../constants/api";

export function useDiagnostic(diagnosticId: string | undefined) {
    return useQuery({
        queryKey: ["diagnostic", diagnosticId],
        queryFn: () =>
            apiFetch<Diagnostic>(`${API_DIAGNOSTICS}/${diagnosticId}`),
        enabled: !!diagnosticId,
    })
}
