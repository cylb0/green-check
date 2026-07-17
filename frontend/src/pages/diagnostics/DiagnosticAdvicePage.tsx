import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ActionButton, Advice, Treatments } from "@/components";
import { useDiagnosticAdvice, useTranslation } from "@/hooks";
import { ERRORS } from "@/data";
import { HOME_PAGE } from "@/constants";

export default function DiagnosticAdvicePage() {
    const navigate = useNavigate()
    const { diagnosticId } = useParams()
    const { data, isLoading, error } = useDiagnosticAdvice(diagnosticId)
    const { DIAGNOSTIC_FETCH_FAIL } = useTranslation(ERRORS)

    useEffect(() => {
        if (error) toast.error(DIAGNOSTIC_FETCH_FAIL)
    }, [error, DIAGNOSTIC_FETCH_FAIL ])

    if (isLoading) return <div>Loading ...</div>
    if (error || !data) return null

    return (
        <div className="min-h-screen flex flex-col px-6">
            <Treatments data={data.treatments} />
            <Advice text={data.advice_text} />
            <ActionButton
                label="Retour à l'accueil"
                onClick={() => navigate(HOME_PAGE)}
                borderColor="border-transparent"
                textColor="text-on-primary"
                bgColor="bg-gradient-to-br from-primary-light to-primary shadow-lg shadow-primary-light/25"
                hoverColor="hover:brightness-105 active:brightness-95"
            />
        </div>
    )
}
