import { capitalize } from "@/services";
import type { Severity } from "@/types";

interface SeverityBadgeProps {
    severity: Severity
}

export default function SeverityBadge({ severity }: SeverityBadgeProps) {
    const severityStyles: Record<Exclude<Severity, null>, string> = {
        low: "text-severity-low-dark-text bg-severity-low-dark-bg",
        medium: "text-severity-moderate-dark-text bg-severity-moderate-dark-bg",
        high: "text-severity-high-dark-text bg-severity-high-dark-bg"
    }

    if (!severity) return null

    return (
        <span className={`label py-1 px-2.5 rounded-full flex-shrink-0 ${severityStyles[severity]}`}>
            {capitalize(severity)}
        </span>
    )
}
