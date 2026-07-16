import { capitalize } from "@/services";
import type { Severity } from "@/types";

interface SeverityBadgeProps {
    severity: Severity
}

export default function SeverityBadge({ severity }: SeverityBadgeProps) {
    const severityStyles: Record<Exclude<Severity, null>, string> = {
        low: "text-severity-low-text bg-severity-low-bg",
        medium: "text-severity-moderate-text bg-severity-moderate-bg",
        high: "text-severity-high-text bg-severity-high-bg"
    }

    if (!severity) return null

    return (
        <span className={`text-xs font-bold py-1 px-2.5 rounded-lg flex-shrink-0 ${severityStyles[severity]}`}>
            {capitalize(severity)}
        </span>
    )
}
