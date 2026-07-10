export type Severity = 'low' | 'medium' | 'high' | null

export interface Diagnostic {
    id: string
    status: DiagnosticStatus
    detected_plant: string
    detected_disease: string
    plant_label: string
    disease_label: string
    confidence: number
    advice_text: string | null
    created_at: string
    severity: Severity
    original_image_url: string
}

const DIAGNOSTIC_STATUSES = ['pending', 'processing', 'success', 'low_confidence', 'no_advice', 'ai_error'] as const
export type DiagnosticStatus = typeof DIAGNOSTIC_STATUSES[number]
export const isDiagnosticStatus = (status: string): status is DiagnosticStatus => (DIAGNOSTIC_STATUSES as readonly string[]).includes(status)

export type DiagnosticStatusResponse = Pick<Diagnostic, 'status'>

export interface Advice {
    plant_label?: string
    disease_label: string
    severity?: string
    soil_type?: string
    exposure?: string
    advice_text: string
}

export interface DiagnosticStats {
    total: number
    alerts: number
    average_confidence: number | null
}