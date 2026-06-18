export type Severity = 'low' | 'medium' | 'high' | null

export interface Diagnostic {
    id: string
    status: string
    detected_plant: string
    detected_disease: string
    plant_label: string
    disease_label: string
    confidence: number
    advice_text: string
    created_at: string
    severity: Severity
    original_image_url: string
}

export type DiagnosticStatus = 'pending' | 'processing' | 'success' | 'low_confidence' | 'failed'

export type DiagnosticStatusResponse = Pick<Diagnostic, 'status'>

export interface Advice {
    plant_type?: string
    disease_label: string
    severity?: string
    soil_type?: string
    exposure?: string
    advice_text: string
}