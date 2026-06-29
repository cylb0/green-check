import { useQuery } from "@tanstack/react-query";
import apiFetch from "../../api/client";
import { API_DIAGNOSTICS } from "../../constants";
import { useLanguage } from "../../context";
import type { Diagnostic } from "../../types";

export function useDiagnostics() {
    const { language } = useLanguage()

    return useQuery({
        queryKey: ["diagnostics"],
        queryFn: () => apiFetch<Diagnostic[]>(API_DIAGNOSTICS, { language })
    })
}
