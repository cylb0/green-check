import { useNavigate } from "react-router-dom";
import { Card } from "@/components";
import { useTranslation } from "@/hooks";
import { QUICK_ACCESS_CONFIG, QUICK_ACCESS_TRANSLATIONS } from "@/data";

interface QuickAccessSectionProps {
    className?: string
}

export default function QuickAccessSection({ className = "" }: QuickAccessSectionProps) {
    const navigate = useNavigate()
    const trad = useTranslation(QUICK_ACCESS_TRANSLATIONS)

    const content = (Object.keys(QUICK_ACCESS_CONFIG) as Array<keyof typeof QUICK_ACCESS_CONFIG>).map(key => ({
        icon: QUICK_ACCESS_CONFIG[key].icon,
        link: QUICK_ACCESS_CONFIG[key].link,
        label: trad.labels[key],
    }))
        
    return (
        <div className={`${className}`}>
            <h2 className="text-heading-sm text-ink-900">{trad.title}</h2>
            <div className="grid grid-cols-3 gap-4 mt-2">
                {content.map((item, i) => (
                    <button
                        key={`qas-${i}`}
                        onClick={() => navigate(item.link)}
                        className="group transition-all duration-150
                        hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                    >
                        <Card className="group-hover:bg-paper/70 group-hover:border/80 group-hover:shadow-md">
                            <div className="h-10 w-10 flex items-center justify-center">
                                <item.icon size={22} className="text-ink-600" />
                            </div>
                            <span className="h-10 flex items-center text-sm font-semibold text-center text-ink-900">{item.label}</span>
                        </Card>
                    </button>
                ))}
            </div>
        </div>
    )
}
