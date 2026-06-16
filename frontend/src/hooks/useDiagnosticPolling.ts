import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import apiFetch from "../api/client"
import { type DiagnosticStatus, type DiagnosticStatusResponse } from "../types/diagnostics"
import { DIAGNOSTIC_STATUS_SUCCESS, DIAGNOSTIC_STATUS_ERROR } from "../constants/diagnostics"

export function useDiagnosticPolling(diagnosticId: string | undefined) {
    const [status, setStatus] = useState<DiagnosticStatus>('pending')
    const navigate = useNavigate()

    useEffect(() => {
        if (!diagnosticId) return

        const checkStatus = async () => {
            try {
                const data = await apiFetch<DiagnosticStatusResponse>(`/api/diagnostics/${diagnosticId}`)

                setStatus(data.status as any)

                if (DIAGNOSTIC_STATUS_SUCCESS.includes(data.status)) {
                    navigate(`/diagnostic/${diagnosticId}/result`)
                } else if (DIAGNOSTIC_STATUS_ERROR.includes(data.status)) {
                    navigate(`/diagnostic/${diagnosticId}/error`)
                }
            } catch (err) {
                console.error("Error polling", err)
            }
        }

        checkStatus()
        const interval = setInterval(checkStatus, 2000)

        return () => clearInterval(interval)

    }, [diagnosticId, navigate])

    return { status }
}