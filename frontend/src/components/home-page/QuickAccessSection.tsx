import { useNavigate } from "react-router-dom";
import { QUICK_ACCESS_CONFIG, QUICK_ACCESS_TRANSLATIONS } from "../../data/homePage";
import Card from "../ui/Card";
import { useTranslation } from "../../hooks/useTranslation";

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
            <h2 className="text-heading-sm">{trad.title}</h2>
            <div className="grid grid-cols-3 gap-4 mt-2">
                {content.map((item, i) => (
                    <button
                        key={`qas-${i}`}
                        className="active:scale-110"
                        onClick={() => navigate(item.link)}
                    >
                        <Card>
                            <div className="h-10 w-10 flex items-center justify-center">
                                <item.icon size={32} className="text-primary" />
                            </div>
                            <span className="h-10 flex items-center text-sm font-semibold text-center text-foreground">{item.label}</span>
                        </Card>
                    </button>
                ))}
            </div>
        </div>
    )
}
