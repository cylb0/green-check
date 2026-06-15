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
