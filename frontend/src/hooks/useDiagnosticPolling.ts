import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import apiFetch from "../api/client"
import { isDiagnosticStatus, type DiagnosticStatus, type DiagnosticStatusResponse } from "../types/diagnostics"
import { DIAGNOSTIC_STATUS_SUCCESS, DIAGNOSTIC_STATUS_ERROR } from "../constants/diagnostics"
import { useQuery } from "@tanstack/react-query"

export function useDiagnosticPolling(diagnosticId: string | undefined) {
    const navigate = useNavigate()

    const { data } = useQuery({
        queryKey: ["diagnostic-status", diagnosticId],
        queryFn: () => apiFetch<DiagnosticStatusResponse>(`/api/diagnostics/${diagnosticId}`),
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
