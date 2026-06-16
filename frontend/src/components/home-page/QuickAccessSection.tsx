import { useNavigate } from "react-router-dom";
import type { QuickAccessContent } from "../../data/homePage";
import Card from "../ui/Card";

interface QuickAccessSectionProps extends QuickAccessContent {
    className?: string
}

export default function QuickAccessSection({ title, content, className = "" }: QuickAccessSectionProps) {
    const navigate = useNavigate()
        
    return (
        <div className={`${className}`}>
            <h2 className="text-heading-sm">{title}</h2>
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
                            <span className="h-10 flex- items-center text-sm font-semibold text-center text-foreground">{item.label}</span>
                        </Card>
                    </button>
                ))}
            </div>
        </div>
    )
}
