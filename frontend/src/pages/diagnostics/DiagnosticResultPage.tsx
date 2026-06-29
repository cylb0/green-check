import toast from "react-hot-toast"
import { useEffect } from "react"
import { useOutletContext, useParams } from "react-router-dom"
import { useTranslation } from "../../hooks"
import { ERRORS } from "../../data"
import { HOME_PAGE } from "../../constants"
import { RESULTS_PAGE_NAME } from "../../data"
import { useDiagnostic } from "../../hooks"
import { DiseaseResult, HealthyResult } from "../../components"

export default function DiagnosticResultPage() {
    const { diagnosticId } = useParams()
    const { data, isLoading, error } = useDiagnostic(diagnosticId)
    const { setTitle, setTo } = useOutletContext<{
        setTitle: (t: string) => void,
        setTo: (t: string | undefined) => void
    }>()
    const title = useTranslation(RESULTS_PAGE_NAME)
    const { DIAGNOSTIC_FETCH_FAIL } = useTranslation(ERRORS)

    useEffect(() => {
        setTitle(title)
        setTo(HOME_PAGE)
    }, [setTitle])

    useEffect(() => {
        if (error) toast.error(DIAGNOSTIC_FETCH_FAIL)
    }, [error, DIAGNOSTIC_FETCH_FAIL ])
    
    if (isLoading) return <div>Loading ...</div>
    if (error || !data) return null

    const isHealthy = data.detected_disease == "healthy"
    const isLowConfidence = data.status == "low_confidence"

    return (
        <div className="flex flex-col items-start px-6">
            <img
                src={data.original_image_url}
                alt="Plant"
                className="w-screen max-w-none h-1/3 relative left-1/2 -translate-x-1/2 max-h-[33vh] h-full object-cover"
            />
    
            {isHealthy && (
                <HealthyResult
                    plant={data.plant_label}
                    confidence={data.confidence}
                />
            )}
            {!isHealthy && (
                <DiseaseResult
                    plant={data.plant_label}
                    confidence={data.confidence}
                    disease={data.disease_label}
                    severity={data.severity}
                    isLowConfidence={isLowConfidence}
                />
            )}
        </div>
    )
}

