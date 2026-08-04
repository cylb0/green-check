import { Alerts, FeatureCard, QuickAccessSection, StatsSection, Welcome } from "@/components";
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

    // gap-6 = space-md (24px) entre blocs — §5.2
    return (
        <div className="flex flex-col w-full gap-6 pt-2">
            <div className="flex items-center justify-between">
                <Welcome />
                <Alerts hasAlerts={!!data?.alerts} />
            </div>
            <FeatureCard title={title} subtext={subtext} link={FEATURE_CARD_LINK} />
            <QuickAccessSection />
            <StatsSection values={values} />
        </div>
    )
}
