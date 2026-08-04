import { useAuthNav } from "@/context";
import { LANDING_PAGE_CONTENT } from "@/data";
import { useTranslation } from "@/hooks";
import { ActionButton, DotAuthNav, PlantScannerIcon } from "@/components";

export default function LandingPage() {
    const { goTo } = useAuthNav()
    const trad = useTranslation(LANDING_PAGE_CONTENT)

    return (
        <div className="min-h-dvh flex flex-col items-center justify-center px-4">
            <PlantScannerIcon />
            <h1 className="text-center title-lg text-ink-inverse mt-6">{trad.title}</h1>
            <span className="text-center title-sm text-ink-inverse/65 mt-2">{trad.catchphrase}</span>
            <div className="mt-10"><DotAuthNav /></div>
            <ActionButton
                className="mt-6"
                label={trad.buttonLabel}
                onClick={() => goTo(1)}
                borderColor="border-transparent"
                textColor="text-on-primary"
                bgColor="bg-gradient-to-br from-primary-light to-primary"
                hoverColor="hover:brightness-105 active:brightness-95"
            />
        </div>
    )
}
