import { Alerts, FeatureCard, Header, QuickAccessSection, StatsSection } from "@/components";
import { useDiagnosticStats, useTranslation } from "@/hooks";
import { FEATURE_CARD_LINK, FEATURE_CARD_TRANSLATIONS, type StatsKey } from "@/data";

export default function HomePage() {
    const { title, subtext } = useTranslation(FEATURE_CARD_TRANSLATIONS)
    const { data } = useDiagnosticStats()

    const values: Record<StatsKey, string> = {
        analysis: data ? String(data.total) : '-',
        alerts: data ? String(data.alerts) : '-',
        accuracy: data?.average_confidence != null
            ? `${Math.round(data.average_confidence * 100)}%`
            : '-'
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-end">
                <Alerts />
            </div>
            <Header className="mt-6 mb-2"/>
            <FeatureCard title={title} subtext={subtext} link={FEATURE_CARD_LINK} className="my-2" />
            <QuickAccessSection className="my-2" />
            <StatsSection className="my-2" values={values} />
        </div>
    )
}
