import type { Diagnostic } from "../types/diagnostics";
import apiFetch from "../api/client";
import { useLanguage } from "../context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { API_DIAGNOSTICS } from "../constants/api";

export function useDiagnostics() {
    const { language } = useLanguage()

    return useQuery({
        queryKey: ["diagnostics"],
        queryFn: () => apiFetch<Diagnostic[]>(API_DIAGNOSTICS, { language })
    })
}
