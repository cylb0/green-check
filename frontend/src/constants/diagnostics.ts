export const LEAF_DETECTION_MODEL_PATH = import.meta.env.VITE_LEAF_DETECTION_MODEL_PATH
export const LEAF_SCAN_CONFIDENCE_TRESHOLD = Number(import.meta.env.VITE_LEAF_SCAN_CONFIDENCE_TRESHOLD)
export const LEAF_DETECTION_DEBUG = import.meta.env.VITE_LEAF_DETECTION_DEBUG === 'true'

export const DIAGNOSTIC_STATUS_PENDING = ['processing', 'pending'] as const
export const DIAGNOSTIC_STATUS_SUCCESS = ['success', 'low_confidence', 'no_advice'] as const
export const DIAGNOSTIC_STATUS_ERROR = ['ai_error'] as const
const ALL_STATUSES = [
    ...DIAGNOSTIC_STATUS_PENDING,
    ...DIAGNOSTIC_STATUS_SUCCESS,
    ...DIAGNOSTIC_STATUS_ERROR
] as readonly string[]

export type DiagnosticStatusPending = typeof DIAGNOSTIC_STATUS_PENDING
export type DiagnosticStatusSuccess = typeof DIAGNOSTIC_STATUS_SUCCESS
export type DiagnosticStatusError = typeof DIAGNOSTIC_STATUS_ERROR
export type DiagnosticStatus =
    | DiagnosticStatusPending[number]
    | DiagnosticStatusError[number]
    | DiagnosticStatusSuccess[number]

export const isDiagnosticStatus = (status: string): status is DiagnosticStatus => {
    return (
        ALL_STATUSES.includes(status)
    )
}

export const isDiagnosticPending = (status: DiagnosticStatus): boolean => {
    return (DIAGNOSTIC_STATUS_PENDING as readonly string[]).includes(status)
}

export const isDiagnosticSuccess = (status: DiagnosticStatus): boolean => {
    return (DIAGNOSTIC_STATUS_SUCCESS as readonly string[]).includes(status)
}

export const isDiagnosticError = (status: DiagnosticStatus): boolean => {
    return (DIAGNOSTIC_STATUS_ERROR as readonly string[]).includes(status)
}
