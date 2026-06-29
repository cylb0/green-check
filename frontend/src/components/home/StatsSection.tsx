import { Card } from "@/components"
import { useTranslation } from "@/hooks"
import { STATS_CONFIG, STATS_TRANSLATIONS, type StatsKey } from "@/data"

interface StatsSectionProps {
    values: readonly string[]
    className?: string
}

export default function StatsSection({ values, className = "" }: StatsSectionProps) {
    const trad = useTranslation(STATS_TRANSLATIONS)

    const statKeys = Object.keys(STATS_CONFIG) as StatsKey[]

    return (
        <div className={`${className}`}>
            <h2 className="text-heading-sm">{trad.title}</h2>
            <div className="grid grid-cols-3 gap-4 mt-2">
                {statKeys.map((key, i) => (
                    <Card key={`qas-${i}`}>
                        <p className="text-heading flex text-center">{values[i]}</p>
                        <span className="h-10 flex items-center text-sm font-semibold text-center text-foreground">{trad.labels[key]}</span>
                    </Card>
                ))}
            </div>
        </div>
    )
}
