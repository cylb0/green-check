import { StatusTicker } from "../../components";
import { useDiagnosticPolling } from "../../hooks";
import { useTranslation } from "../../hooks";
import { DIAGNOSTIC_PAGE_CONTENT } from "../../data";
import { useParams } from "react-router-dom"
import { LuBrain } from "react-icons/lu";

export default function DiagnosticProcessingPage() {
    const { diagnosticId } = useParams<{ diagnosticId: string }>()
    const { title, messages } = useTranslation(DIAGNOSTIC_PAGE_CONTENT)
    useDiagnosticPolling(diagnosticId)

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
            <div className="relative flex items-center justify-center p-12">
                <div className="absolute w-32 h-32 border-[6px] border-primary/20 border-t-primary bg-primary/20 rounded-full animate-spin" />
                <LuBrain size={64} className="text-primary" />
            </div>

            <h1 className="text-center text-heading">{title}</h1>

            <StatusTicker messages={messages} />
        </div>
    )
}
