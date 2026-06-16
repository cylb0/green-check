interface DiagnosticPageContent {
    title: string
    subtext: string
    messages: string[]
}

export const DIAGNOSTIC_PAGE_CONTENT = {
    title: "Analyzing...",
    subtext: "Our AI model is ",
    messages: [
        "Analyzing plant features...",
        "Detecting patterns...",
        "Analyzing colors...",
        "Comparing to model...",
        "Evaluating severity..."
    ]
} as const satisfies DiagnosticPageContent

interface DiagnosticResultPageContent {
    title: string
    confidence: string
    severity: string
    seeRecommendations: string
    healthy: string
}

export const DIAGNOSTIC_RESULT_PAGE_CONTENT = {
    title: "Results",
    confidence: "Confidence",
    severity: "Severity",
    seeRecommendations: "See Recommendations",
    healthy: "Healthy"
} as const satisfies DiagnosticResultPageContent

interface DiagnosticAdvicePageContent {
    title: string
    treatments: string
    advice: string
}

export const DIAGNOSTIC_ADVICE_PAGE_CONTENT = {
    title: "Action Plan",
    treatments: "Suggested treatments", 
    advice: "Care Tips"
} as const satisfies DiagnosticAdvicePageContent