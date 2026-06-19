import PlantScannerIcon from "../../components/landing-page/PlantScannerIcon";
import DotAuthNav from "../../components/auth/DotAuthNav";
import { useTranslation } from "../../hooks/useTranslation";
import { LANDING_PAGE_CONTENT } from "../../data/landingPage";

export default function LandingPage() {
    const { title, catchphrase } = useTranslation(LANDING_PAGE_CONTENT)

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
            <PlantScannerIcon />
            <h1 className="text-center text-heading">{title}</h1>
            <span className="text-center text-subheading mt-4">{catchphrase}</span>
            <DotAuthNav />
        </div>
    )
}
