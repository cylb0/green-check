import toast from "react-hot-toast";
import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Advice, Treatments } from "@/components";
import { useDiagnosticAdvice, useTranslation } from "@/hooks";
import { DIAGNOSTIC_ADVICE_PAGE_CONTENT, ERRORS } from "@/data";
import { capitalize } from "@/services";

export default function DiagnosticAdvicePage() {
    const { diagnosticId } = useParams()
    const { data, isLoading, error } = useDiagnosticAdvice(diagnosticId)
    const { setTitle } = useOutletContext<{ setTitle: (t: string) => void }>()
    const { DIAGNOSTIC_FETCH_FAIL } = useTranslation(ERRORS)
    const trad = useTranslation(DIAGNOSTIC_ADVICE_PAGE_CONTENT)

    useEffect(() => {
        setTitle(trad.title)
    }, [setTitle])

    useEffect(() => {
        if (error) toast.error(DIAGNOSTIC_FETCH_FAIL)
    }, [error, DIAGNOSTIC_FETCH_FAIL ])

    if (isLoading) return <div>Loading ...</div>
    if (error || !data) return null

    const displayTitle = [
        data.plant_label && capitalize(data.plant_label),
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
