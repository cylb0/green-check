import type { QuickAccessContent } from "../../data/homePage";
import Card from "../ui/Card";

interface QuickAccessSectionProps extends QuickAccessContent {
    className?: string
}

export default function QuickAccessSection({ title, content, className = "" }: QuickAccessSectionProps) {
    return (
        <div className={`${className}`}>
            <h2 className="text-heading-sm">{title}</h2>
            <div className="grid grid-cols-3 gap-4 mt-2">
                {content.map((item, i) => (
                    <Card key={`qas-${i}`}>
                        <div className="h-10 w-10 flex items-center justify-center">
                            <item.icon size={32} className="text-primary/50 active:text-primary/80" />
                        </div>
                        <span className="h-10 flex- items-center text-sm font-semibold text-center text-primary/80">{item.label}</span>
                    </Card>
                ))}
            </div>
        </div>
    )
}
