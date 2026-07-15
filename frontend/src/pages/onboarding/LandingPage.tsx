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
            <h1 className="text-center text-heading text-ink-inverse">{trad.title}</h1>
            <span className="text-center text-subheading text-ink-inverse/65 mt-4">{trad.catchphrase}</span>
            <DotAuthNav />
            <ActionButton
                label={trad.buttonLabel}
                onClick={() => goTo(1)}
                borderColor="border-transparent"
                textColor="text-on-primary"
                bgColor="bg-gradient-to-br from-primary-light to-primary"
                hoverColor="hover:brightness-105 active:brightness-105"
            />
        </div>
    )
}
