interface ConfidenceBarProps {
    label?: string
    confidence: number
    isLowConfidence?: boolean
}

export default function ConfidenceBar({ label, confidence, isLowConfidence = false }: ConfidenceBarProps) {
    const score = Math.round(confidence * 100)
    const colorClass = isLowConfidence ? "bg-warning" : "bg-success"

    return (
        <div className="w-full">
            <div className="flex justify-between items-center">
                {label && <span className="text-[13px] text-foreground/50">{label}</span>}
                <span className="text-md text-foreground/50 ml-auto">{score}%</span>
            </div>

            <div className="h-[5px] w-full bg-foreground/20 rounded-full overflow-hidden">
                <div 
                    className={`h-full rounded-full transition-all duration-300 ease-in-out ${colorClass}`}
                    style={{ width: `${score}%` }}
                />
            </div>
        </div>
    )
}
