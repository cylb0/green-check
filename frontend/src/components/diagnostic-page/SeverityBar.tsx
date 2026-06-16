import type { Severity } from "../../types/diagnostics";

interface SeverityBarProps {
    severity: Severity
    isHealthy: boolean
}

const SEGMENTS = 10

export default function SeverityBar({ severity, isHealthy }: SeverityBarProps) {
    const level = severity === "low" ? 3 : severity === "medium" ? 4 : 7

    return (
        <div className="flex w-full py-2">
            {Array.from({ length: SEGMENTS }).map((_, i) => {
                const isActive = !isHealthy && i < level
                const rounding = i === 0 ? "rounded-l-xl" : (i === SEGMENTS - 1) || (i === level - 1) ? "rounded-r-xl" : "rounded-none"
                const progress = i / (SEGMENTS - 1)

                return (
                    <div
                        key={i}
                        className={`h-4 flex-1 transition-all duration-500 ${rounding} ${
                            isActive ? "bg-primary" : "bg-primary/5"
                        }`}
                        style={{
                            opacity: isActive ? 0.3 + (progress * 0.8) : 1
                        }}
                    >
                    </div>
                )
            })}
        </div>
    )
}