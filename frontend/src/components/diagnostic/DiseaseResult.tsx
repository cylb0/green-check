import { useNavigate, useParams } from "react-router-dom";
import { CONFIDENCE, RESULT_BUTTONS, RESULT_LOW_CONFIDENCE_DISEASE_CARD, RESULT_NO_ADVICE_DISEASE_CARD } from "@/data";
import { ActionButton, type BaseResultProps, ConfidenceBar, MessageCard, SeverityLabel } from "@/components";
import { useTranslation } from "@/hooks";
import type { Severity } from "@/types";
import { capitalize } from "@/services";
import { PiPottedPlant } from "react-icons/pi";
import { CiWarning } from "react-icons/ci";
import { FaRegSadTear } from "react-icons/fa";
import { SCAN_PAGE } from "@/constants";

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
            <h1 className="text-heading text-ink-inverse">{capitalize(disease)}</h1>
            <div className="flex items-center gap-1.5 text-ink-inverse/70 mb-3">
                <PiPottedPlant size={16} />
                <p className="text-sm font-medium">{capitalize(plant)}</p>
            </div>

            {isLowConfidence && (
                <MessageCard
                    icon={CiWarning}
                    title={lowConfidenceTrad.title}
                    message={lowConfidenceTrad.text}
                    variant="warning"
                    className="mb-3"
                />
            )}

            {!hasAdvice && (
                <MessageCard
                    icon={FaRegSadTear}
                    title={noAdviceTrad.title}
                    message={noAdviceTrad.text}
                    variant="neutral"
                    className="mb-3"
                />
            )}

            <ConfidenceBar label={label} confidence={confidence} isLowConfidence={isLowConfidence} />

            {hasAdvice && severity && (
                <div className="mt-4">
                    <SeverityLabel severity={severity} />
                </div>
            )}

            {hasAdvice && (
                <ActionButton
                    label={seeRecommendations}
                    onClick={() => navigate(`/diagnostic/${diagnosticId}/advice`)}
                    borderColor="border-transparent"
                    textColor="text-on-primary"
                    bgColor="bg-gradient-to-br from-primary-light to-primary shadow-lg shadow-primary-light/20"
                    hoverColor="hover:brightness-105 active:brightness-95"
                />
            )}

            <ActionButton
                label={newScan}
                onClick={() => navigate(SCAN_PAGE)}
                borderColor="border-ink-inverse-20"
                textColor="text-ink-inverse"
                bgColor="bg-ink-inverse/10 backdrop-blur-md"
                hoverColor="hover:bg-ink-inverse/15 active:bg-ink-inverse/20"
            />
        </div>
    )
}
