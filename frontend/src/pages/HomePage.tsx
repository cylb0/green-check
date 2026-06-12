import QuickAccessSection from "../components/home-page/QuickAccessSection";
import StatsSection from "../components/home-page/StatsSection";
import Alerts from "../components/ui/Alerts";
import Header from "../components/home-page/Header";
import FeatureCard from "../components/ui/FeatureCard";
import { FEATURE_CARD, QUICK_ACCESS_CONTENT } from "../data/homePage";

export default function HomePage() {
    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-end">
                <Alerts />
            </div>
            <Header className="mt-6 mb-2"/>
            <FeatureCard {...FEATURE_CARD} className="my-2" />
            <QuickAccessSection {...QUICK_ACCESS_CONTENT} className="my-2" />
            <StatsSection className="my-2" values={["12", "3", "96%"]} />
        </div>
    )
}
