export type DiagnosticStatus = 'pending' | 'processing' | 'success' | 'low_confidence' | 'failed'

export type DiagnosticStatusResponse = {
    status: DiagnosticStatus
}

