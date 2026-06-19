import { useOutletContext, useParams } from "react-router-dom";
import { DIAGNOSTIC_ADVICE_PAGE_CONTENT } from "../../data/diagnosticPage";
import { useDiagnosticAdvice } from "../../hooks/useDiagnosticAdvice";
import { capitalize } from "../../services/textUtils";
import Advice from "../../components/diagnostic-page/Advice";
import Treatments from "../../components/diagnostic-page/Treatments";
import { useEffect } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { ERRORS } from "../../data/messages";
import toast from "react-hot-toast";

export default function DiagnosticAdvicePage() {
    const { diagnosticId } = useParams()
    const { data, isLoading, error } = useDiagnosticAdvice(diagnosticId)
    const { setTitle } = useOutletContext<{ setTitle: (t: string) => void }>()
    const { DIAGNOSTIC_FETCH_FAIL } = useTranslation(ERRORS)

    useEffect(() => {
        setTitle(DIAGNOSTIC_ADVICE_PAGE_CONTENT.title)
    }, [setTitle])

    useEffect(() => {
        if (error) toast.error(DIAGNOSTIC_FETCH_FAIL)
    }, [error, DIAGNOSTIC_FETCH_FAIL ])

    if (isLoading) return <div>Loading ...</div>
    if (error || !data) return null

    const displayTitle = [
        data.plant_type && capitalize(data.plant_type),
        capitalize(data.disease_label)
    ].filter(Boolean).join(" - ")
    
    return (
        <div className="min-h-screen flex flex-col px-6 mt-12">
            <p className="text-subheading">{displayTitle}</p>
            <Treatments />
            <Advice text={data.advice_text} />
        </div>
    )
}
