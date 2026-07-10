import { apiFetch } from "@/api";
import { API_DIAGNOSTICS } from "@/constants";
import type { DiagnosticStats } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useDiagnosticStats() {
    return useQuery({
        queryKey: ['diagnostics', 'stats'],
        queryFn: () => apiFetch<DiagnosticStats>(`${API_DIAGNOSTICS}/stats`)
    })
}
