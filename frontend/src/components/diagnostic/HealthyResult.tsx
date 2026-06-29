import { useNavigate } from "react-router-dom";
import { ActionButton, ConfidenceBar, MessageCard } from "@/components";
import { useTranslation } from "@/hooks"
import { CONFIDENCE, RESULT_BUTTONS, RESULT_HEALTHY } from "@/data"
import { FaCheck } from "react-icons/fa"
import { IoLeafOutline } from "react-icons/io5";

export interface BaseResultProps {
    plant: string
    confidence: number
}

interface HealthyResultProps extends BaseResultProps {}

export default function HealthyResult({ plant, confidence }: HealthyResultProps) {
    const navigate = useNavigate()
    const trad = useTranslation(RESULT_HEALTHY)
    const label = useTranslation(CONFIDENCE)
    const { newScan } = useTranslation(RESULT_BUTTONS)

    return (
        <div className="flex flex-col w-full mt-6">
            <FaCheck size={64} className="self-center bg-primary/20 rounded-full text-primary p-4" />
            <div className="text-center pt-2 pb-4">
                <h1 className="text-heading">{trad.title}</h1>
                <p className="text-sm text-foreground/80 font-medium">{plant} {trad.label}</p>
            </div>
            <MessageCard icon={IoLeafOutline} title={trad.card.title} message={trad.card.text} className="bg-primary/20 text-primary" />
            <ConfidenceBar label={label} confidence={confidence} />
            <ActionButton
                label={newScan}
                onClick={() => navigate("/scan")}
            />
        </div>
    )
}
