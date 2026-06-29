import { capitalize } from "@/services";
import type { Severity } from "@/types";

interface SeverityBadgeProps {
    severity: Severity
}

export default function SeverityBadge({ severity }: SeverityBadgeProps) {
    const severityStyles: Record<Exclude<Severity, null>, string> = {
        low: "text-success bg-success/20",
        medium: "text-warning bg-warning/20",
        high: "text-error bg-error/20"
    }

    if (!severity) return null

    return (
        <span className={`text-sm font-bold ml-auto py-1 px-2 rounded-xl ${severityStyles[severity]}`}>
            {capitalize(severity)}
        </span>
    )
}
