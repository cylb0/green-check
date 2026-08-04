interface ConfidenceBarProps {
    label?: string
    confidence: number
    isLowConfidence?: boolean
}

export default function ConfidenceBar({ label, confidence, isLowConfidence = false }: ConfidenceBarProps) {
    const score = Math.round(confidence * 100)
    const barColor = isLowConfidence ? "bg-severity-moderate-text" : "bg-primary-light"

    return (
        <div className="w-full mt-4">
            <div className="flex justify-between items-center mb-1">
                {label && <span className="label text-ink-inverse/60">{label}</span>}
                {/* tabular : la valeur s'anime avec la barre, sa largeur ne doit pas bouger */}
                <span className="body-strong tabular text-ink-inverse ml-auto">{score}%</span>
            </div>

            <div className="h-1.5 w-full bg-ink-inverse/20 rounded-full overflow-hidden">
                <div 
                    className={`h-full rounded-full transition duration-500 ease-in-out ${barColor}`}
                    style={{ width: `${score}%` }}
                />
            </div>
        </div>
    )
}
