import { SeverityBadge } from ".."
import { SEVERITY } from "../../data"
import { useTranslation } from "../../hooks"
import type { Severity } from "../../types"

interface SeverityLabelProps {
    severity: NonNullable<Severity>
}

export default function SeverityLabel({ severity }: SeverityLabelProps) {
    const label = useTranslation(SEVERITY)

    return (
        <div className="w-full my-4">
            <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/50">{label}</span>
                <SeverityBadge severity={severity}/>
            </div>
        </div>
    )
}
