import { STATS_SECTION_CONTENT } from "../../data/homePage"
import Card from "../ui/Card"

interface StatsSectionProps {
    values: readonly string[]
    className?: string
}

export default function StatsSection({ values, className = "" }: StatsSectionProps) {
    return (
        <div className={`${className}`}>
            <h2 className="text-heading-sm">{STATS_SECTION_CONTENT.title}</h2>
            <div className="grid grid-cols-3 gap-4 mt-2">
                {STATS_SECTION_CONTENT.content.map((item, i) => (
                    <Card key={`qas-${i}`}>
                        <p className="text-heading flex text-center">{values[i]}</p>
                        <span className="h-10 flex items-center text-sm font-semibold text-center text-primary/80">{item.label}</span>
                    </Card>
                ))}
            </div>
        </div>
    )
}
