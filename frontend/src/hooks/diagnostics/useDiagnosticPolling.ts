import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { API_DIAGNOSTICS, DIAGNOSTIC_STATUS_ERROR, DIAGNOSTIC_STATUS_SUCCESS } from "../../constants"
import apiFetch from "../../api/client"
import { isDiagnosticStatus, type DiagnosticStatus, type DiagnosticStatusResponse } from "../../types"

export function useDiagnosticPolling(diagnosticId: string | undefined) {
    const navigate = useNavigate()

    const { data } = useQuery({
        queryKey: ["diagnostic-status", diagnosticId],
        queryFn: () => apiFetch<DiagnosticStatusResponse>(`${API_DIAGNOSTICS}/${diagnosticId}`),
        enabled: !!diagnosticId,
        refetchInterval: 2000,
        refetchIntervalInBackground: true
    })

    const status: DiagnosticStatus = (data && isDiagnosticStatus(data.status))
        ? data.status
        : "pending"

    useEffect(() => {
        if (data?.status && isDiagnosticStatus(data.status)) {
            if (DIAGNOSTIC_STATUS_SUCCESS.includes(data.status)) {
                navigate(`/diagnostic/${diagnosticId}/result`)
            } else if (DIAGNOSTIC_STATUS_ERROR.includes(data.status)) {
                navigate(`/diagnostic/${diagnosticId}/error`)
            }
        }
    }, [data, diagnosticId, navigate])

    return { status }
}
