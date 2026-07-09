import type { DiagnosticStatus } from "@/types"

export const LEAF_DETECTION_MODEL_PATH = import.meta.env.VITE_LEAF_DETECTION_MODEL_PATH
export const LEAF_SCAN_CONFIDENCE_TRESHOLD = Number(import.meta.env.VITE_LEAF_SCAN_CONFIDENCE_TRESHOLD)
export const LEAF_DETECTION_DEBUG = import.meta.env.VITE_LEAF_DETECTION_DEBUG === 'true'

export const DIAGNOSTIC_STATUS_SUCCESS: DiagnosticStatus[] = ['success', 'low_confidence', 'no_advice']
export const DIAGNOSTIC_STATUS_ERROR: DiagnosticStatus[] = ['ai_error']
