import QuickAccessSection from "../components/home-page/QuickAccessSection";
import StatsSection from "../components/home-page/StatsSection";
import Alerts from "../components/ui/Alerts";
import Header from "../components/home-page/Header";
import FeatureCard from "../components/ui/FeatureCard";
import { FEATURE_CARD_LINK, FEATURE_CARD_TRANSLATIONS } from "../data/homePage";
import { useTranslation } from "../hooks/useTranslation";

export default function HomePage() {
    const { title, subtext } = useTranslation(FEATURE_CARD_TRANSLATIONS)

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-end">
                <Alerts />
            </div>
            <Header className="mt-6 mb-2"/>
            <FeatureCard title={title} subtext={subtext} link={FEATURE_CARD_LINK} className="my-2" />
            <QuickAccessSection className="my-2" />
            <StatsSection className="my-2" values={["12", "3", "96%"]} />
        </div>
    )
}
