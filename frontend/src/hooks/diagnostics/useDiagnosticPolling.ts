import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { API_DIAGNOSTICS, isDiagnosticError, isDiagnosticStatus, isDiagnosticSuccess } from "@/constants"
import { apiFetch } from "@/api"
import { type DiagnosticStatusResponse } from "@/types"

export function useDiagnosticPolling(diagnosticId: string | undefined) {
    const navigate = useNavigate()

    const { data } = useQuery({
        queryKey: ["diagnostic-status", diagnosticId],
        queryFn: () => apiFetch<DiagnosticStatusResponse>(`${API_DIAGNOSTICS}/${diagnosticId}`),
        enabled: !!diagnosticId,
        refetchInterval: 2000,
        refetchIntervalInBackground: true
    })

    useEffect(() => {
        if (data?.status && isDiagnosticStatus(data.status)) {
            if (isDiagnosticSuccess(data.status)) {
                navigate(`/diagnostic/${diagnosticId}/result`)
            } else if (isDiagnosticError(data.status)) {
                navigate(`/diagnostic/${diagnosticId}/error`)
            }
        }
    }, [data, diagnosticId, navigate])

    return { status }
}
