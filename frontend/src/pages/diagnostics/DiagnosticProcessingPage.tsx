import { useParams } from "react-router-dom"
import { LuBrainCircuit } from "react-icons/lu";
import StatusTicker from "../../components/diagnostic-page/StatusTicker";
import { DIAGNOSTIC_PAGE_CONTENT } from "../../data/diagnosticPage";
import { useDiagnosticPolling } from "../../hooks/useDiagnosticPolling";

export default function DiagnosticProcessingPage() {
    const { diagnosticId } = useParams<{ diagnosticId: string }>()
    const { status } = useDiagnosticPolling(diagnosticId)

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
            <h1 className="text-center text-heading">{DIAGNOSTIC_PAGE_CONTENT.title}</h1>
            
            <div className="relative flex items-center justify-center p-12 mt-12">
                <div className="absolute w-32 h-32 border-[6px] border-primary/20 border-t-primary rounded-full animate-spin" />
                <LuBrainCircuit size={64} className="text-primary/80" />
            </div>

            <StatusTicker messages={DIAGNOSTIC_PAGE_CONTENT.messages} />
        </div>
    )
}
