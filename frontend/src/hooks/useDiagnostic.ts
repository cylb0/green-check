import type { Diagnostic } from "../types/diagnostics";
import apiFetch from "../api/client";
import { useQuery } from "@tanstack/react-query"

export function useDiagnostic(diagnosticId: string | undefined) {
    return useQuery({
        queryKey: ["diagnostic", diagnosticId],
        queryFn: () =>
            apiFetch<Diagnostic>(`/api/diagnostics/${diagnosticId}`),
        enabled: !!diagnosticId,
    })
}
