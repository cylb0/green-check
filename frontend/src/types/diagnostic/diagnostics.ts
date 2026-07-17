import type { DiagnosticStatus } from "@/constants"

export type Severity = 'low' | 'medium' | 'high' | null

export interface Diagnostic {
    id: string
    status: DiagnosticStatus
    detected_plant: string | null
    detected_disease: string | null
    plant_label: string | null
    disease_label: string | null
    confidence: number | null
    advice_text: string | null
    created_at: string
    severity: Severity
    original_image_url: string
    has_advice: boolean
}

export type DiagnosticStatusResponse = Pick<Diagnostic, 'status'>

export interface Treatment {
    icon?: string
    title: string
    description: string
}

export interface Advice {
    plant_label?: string
    disease_label: string
    severity?: string
    soil_type?: string
    exposure?: string
    advice_text: string
    treatments: Treatment[]
}

export interface DiagnosticStats {
    total: number
    alerts: number
    average_confidence: number | null
}