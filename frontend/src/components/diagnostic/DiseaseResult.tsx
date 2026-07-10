import { useNavigate, useParams } from "react-router-dom";
import { CONFIDENCE, RESULT_BUTTONS, RESULT_LOW_CONFIDENCE_DISEASE_CARD, RESULT_NO_ADVICE_DISEASE_CARD } from "@/data";
import { ActionButton, type BaseResultProps, ConfidenceBar, MessageCard, SeverityLabel } from "@/components";
import { useTranslation } from "@/hooks";
import type { Severity } from "@/types";
import { capitalize } from "@/services";
import { PiPottedPlant } from "react-icons/pi";
import { CiWarning } from "react-icons/ci";
import { FaRegSadTear } from "react-icons/fa";

interface DiseaseResultProps extends BaseResultProps {
    disease: string
    severity: Severity | null
    isLowConfidence: boolean
    hasAdvice: boolean
}

export default function DiseaseResult({ plant, confidence, disease, severity, isLowConfidence , hasAdvice}: DiseaseResultProps) {
    const label = useTranslation(CONFIDENCE)
    const navigate = useNavigate()
    const { diagnosticId } = useParams()
    const { newScan, seeRecommendations } = useTranslation(RESULT_BUTTONS)
    const lowConfidenceTrad = useTranslation(RESULT_LOW_CONFIDENCE_DISEASE_CARD)
    const noAdviceTrad = useTranslation(RESULT_NO_ADVICE_DISEASE_CARD)
    
    return (
        <div className="flex flex-col w-full mt-6">
            <h1 className="text-heading">{capitalize(disease)}</h1>
            <div className="flex items-center gap-1">
                <PiPottedPlant />
                <p>{capitalize(plant)}</p>
            </div>
            {isLowConfidence && <MessageCard icon={CiWarning} title={lowConfidenceTrad.title} message={lowConfidenceTrad.text} className="bg-warning/20 text-warning" />}
            {!hasAdvice && <MessageCard icon={FaRegSadTear} title={noAdviceTrad.title} message={noAdviceTrad.text} className="bg-success/20 text-success" />}
            <ConfidenceBar label={label} confidence={confidence} isLowConfidence={isLowConfidence} />
            {hasAdvice && (
                <>
                    {severity && <SeverityLabel severity={severity!} />}
                    <ActionButton
                        label={seeRecommendations}
                        onClick={() => navigate(`/diagnostic/${diagnosticId}/advice`)}
                    />
                </>
            )}
            <ActionButton
                label={newScan}
                onClick={() => navigate("/scan")}
            />
        </div>
    )
}
