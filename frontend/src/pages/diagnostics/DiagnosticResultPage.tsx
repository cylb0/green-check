import toast from "react-hot-toast"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { DiseaseResult, HealthyResult } from "@/components"
import { useDiagnostic, useTranslation } from "@/hooks"
import { ERRORS } from "@/data"

export default function DiagnosticResultPage() {
    const { diagnosticId } = useParams()
    const { data, isLoading, error } = useDiagnostic(diagnosticId)
    const { DIAGNOSTIC_FETCH_FAIL } = useTranslation(ERRORS)

    useEffect(() => {
        if (error) toast.error(DIAGNOSTIC_FETCH_FAIL)
    }, [error, DIAGNOSTIC_FETCH_FAIL ])
    
    if (isLoading) return <div>Loading ...</div>
    if (error || !data) return null

    const { plant_label, disease_label, confidence } = data
    if (plant_label === null || disease_label === null || confidence === null) return null

    const isHealthy = data.detected_disease == "healthy"
    const isLowConfidence = data.status == "low_confidence"

    return (
        <div className="flex flex-col items-start px-4">
            <img
                src={data.original_image_url}
                alt="Plant"
                className="w-screen max-w-none h-[20%] max-h-56 relative left-1/2 -translate-x-1/2 relative left-1/2 -translate-x-1/2 object-cover"
            />
    
            {isHealthy && (
                <HealthyResult
                    plant={plant_label}
                    confidence={confidence}
                />
            )}
            {!isHealthy && (
                <DiseaseResult
                    plant={plant_label}
                    confidence={confidence}
                    disease={disease_label}
                    severity={data.severity}
                    isLowConfidence={isLowConfidence}
                    hasAdvice={data.has_advice}
                />
            )}
        </div>
    )
}

