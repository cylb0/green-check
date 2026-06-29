import { useAuthNav } from "@/context";
import { LANDING_PAGE_CONTENT } from "@/data";
import { useTranslation } from "@/hooks";
import { ActionButton, DotAuthNav, PlantScannerIcon } from "@/components";

export default function LandingPage() {
    const { goTo } = useAuthNav()
    const trad = useTranslation(LANDING_PAGE_CONTENT)

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
            <PlantScannerIcon />
            <h1 className="text-center text-heading">{trad.title}</h1>
            <span className="text-center text-subheading mt-4">{trad.catchphrase}</span>
            <DotAuthNav />
            <ActionButton
                label={trad.buttonLabel}
                onClick={() => goTo(1)}
            />
        </div>
    )
}
