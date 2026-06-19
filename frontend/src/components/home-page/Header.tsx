import { HEADER_TRANSLATIONS } from "../../data/homePage";
import { useTranslation } from "../../hooks/useTranslation";

export default function Welcome({ className }: { className?: string }) {
    const { title, subtext } = useTranslation(HEADER_TRANSLATIONS)

    return (
        <div className={`fex flex-col ${className}`}>
            <h1 className="text-heading">{title}</h1>
            <p className="text-subheading">{subtext}</p>
        </div>
    )
}
