import type { Diagnostic } from "../types/diagnostics";
import apiFetch from "../api/client";
import { useLanguage } from "../context/LanguageContext";
import { useQuery } from "@tanstack/react-query";

export function useDiagnostics() {
    const { language } = useLanguage()

    return useQuery({
        queryKey: ["diagnostics"],
        queryFn: () => apiFetch<Diagnostic[]>(`/api/diagnostics`, { language })
    })
}
