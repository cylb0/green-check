import type { Severity } from "../types/diagnostics"

export const getConfidenceColor = (confidence: number) => {
    if (confidence < 75) return "bg-error/50 text-white"
    if (confidence < 90) return "bg-warning/50 text-foreground"
    return "bg-success/50 text-foreground"
}

export const getSeverityColor = (severity: Severity | null | undefined): string => {
    const map: Record<Exclude<Severity, null | undefined>, string> = {
        low: "bg-success text-foreground",
        medium: "bg-warning text-foreground",
        high: "bg-error text-white"
    }

    return severity ? map[severity] : "bg-success text-foreground"
}