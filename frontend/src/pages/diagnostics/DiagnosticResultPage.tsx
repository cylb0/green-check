import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { useDiagnostic } from "../../hooks/useDiagnostic"
import Pill from "../../components/ui/Pill"
import SeverityBar from "../../components/diagnostic-page/SeverityBar"
import { capitalize } from "../../services/textUtils"
import { getConfidenceColor, getSeverityColor } from "../../services/colorUtils"
import { CAMERA_LAYOUT_CONFIG } from "../../constants/camera"
import { useEffect } from "react"
import { DIAGNOSTIC_RESULT_PAGE_CONTENT } from "../../data/diagnosticPage"
import { useTranslation } from "../../hooks/useTranslation"

export default function DiagnosticResultPage() {
    const { diagnosticId } = useParams()
    const { data, isLoading, error } = useDiagnostic(diagnosticId)
    const navigate = useNavigate()
    const { setTitle } = useOutletContext<{ setTitle: (t: string) => void }>()
    const trad = useTranslation(DIAGNOSTIC_RESULT_PAGE_CONTENT)

    useEffect(() => {
        setTitle(trad.title)
    }, [setTitle])
    
    if (isLoading) return <div>Loading ...</div>
    if (error) return <div>{error}</div>
    if (!data) return null

    const isHealthy = data.detected_disease == "healthy"

    const handleButton = () => {
        isHealthy ? navigate("/") : navigate(`/diagnostic/${diagnosticId}/advice`)
    }
    const buttonText = isHealthy ? trad.newDiagnostic : trad.seeRecommendations

    return (
        <div className="min-h-screen flex flex-col items-start justify-center px-6">
            <img
                src={data.original_image_url}
                alt="Plant"
                className="w-full self-center h-auto mb-4"
                style={{ width: `${CAMERA_LAYOUT_CONFIG.FRAME_SIZE_PX}px` }} />
            {!isHealthy && <h1 className="text-heading mb-4">{capitalize(data.disease_label)}</h1>}

            <Pill
                text={`${trad.confidence}: ${data.confidence}%`}
                className={`self-start mb-4 font-medium ${getConfidenceColor(data.confidence)}`} />

            <div className="flex w-full justify-between">
                <h2 className="text-heading-sm">{capitalize(trad.severity)}</h2>
                <Pill 
                    text={capitalize((!isHealthy ? data.severity : trad.healthy) ?? "")} 
                    className={`font-bold ${getSeverityColor(data.severity)}`} 
                />
            </div>

            <SeverityBar severity={data.severity} isHealthy={isHealthy} />

            <button
                type="button"
                onClick={handleButton}
                className="w-full bg-primary font-bold text-white rounded-lg p-2 mt-4 active:scale-110 hover:scale-110"
                disabled={isLoading}
            >
                {buttonText}
            </button>
        </div>
    )
}

