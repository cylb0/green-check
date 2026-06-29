import { useNavigate, useParams } from "react-router-dom";
import { CONFIDENCE, RESULT_BUTTONS, RESULT_DISEASE_CARD } from "../../data";
import { ActionButton, ConfidenceBar, MessageCard, SeverityLabel } from "..";
import { useTranslation } from "../../hooks";
import type { Severity } from "../../types";
import { capitalize } from "../../services";
import { PiPottedPlant } from "react-icons/pi";
import { CiWarning } from "react-icons/ci";
import type { BaseResultProps } from "./HealthyResult";

interface DiseaseResultProps extends BaseResultProps {
    disease: string
    severity: Severity
    isLowConfidence: boolean
}

export default function DiseaseResult({ plant, confidence, disease, severity, isLowConfidence }: DiseaseResultProps) {
    const label = useTranslation(CONFIDENCE)
    const navigate = useNavigate()
    const { diagnosticId } = useParams()
    const { newScan, seeRecommendations } = useTranslation(RESULT_BUTTONS)
    const trad = useTranslation(RESULT_DISEASE_CARD)
    
    return (
        <div className="flex flex-col w-full mt-6">
            <h1 className="text-heading">{capitalize(disease)}</h1>
            <div  className="flex items-center gap-1">
                <PiPottedPlant />
                <p>{capitalize(plant)}</p>
            </div>
            {isLowConfidence && <MessageCard icon={CiWarning} title={trad.title} message={trad.text} className="bg-warning/20 text-warning" />}
            <ConfidenceBar label={label} confidence={confidence} isLowConfidence={isLowConfidence} />
            <SeverityLabel severity={severity!} />
            <ActionButton
                label={seeRecommendations}
                onClick={() => navigate(`/diagnostic/${diagnosticId}/advice`)}
            />
            <ActionButton
                label={newScan}
                onClick={() => navigate("/scan")}
            />
        </div>
    )
}
