import { HOME_PAGE, SCAN_PAGE } from "@/constants"
import { RESULTS_ERROR_PAGE_NAME, DIAGNOSTIC_ERROR_PAGE_CONTENT } from "@/data"
import { useDiagnostic, useTranslation } from "@/hooks"
import { useEffect } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { ActionButton } from "@/components"

export default function DiagnosticErrorPage() {
    const { diagnosticId } = useParams()
    const { data, isLoading, error } = useDiagnostic(diagnosticId)
    const { setTitle, setTo } = useOutletContext<{
        setTitle: (t: string) => void,
        setTo: (t: string | undefined) => void
    }>()
    const title = useTranslation(RESULTS_ERROR_PAGE_NAME)
    const { message, retry } = useTranslation(DIAGNOSTIC_ERROR_PAGE_CONTENT)
    const navigate = useNavigate()

    useEffect(() => {
        console.log(data)
    }, [useDiagnostic])

    useEffect(() => {
        setTitle(title)
        setTo(HOME_PAGE)
    }, [setTitle, setTo])

    return (
        <div className="flex flex-col items-center justify-center h-full px-6 text-center gap-4">
            <p className="text-subheading">
                {message}
            </p>
            <ActionButton
                label={retry}
                onClick={() => navigate(SCAN_PAGE)}
                bgColor="bg-primary"
                textColor="text-white"
                borderColor="border-transparent"
            />
        </div>
    )
}
