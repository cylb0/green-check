import { useParams } from "react-router-dom"

export default function DiagnosticProcessingPage() {
    const { diagnosticId } = useParams()
    
    return (
        <>{diagnosticId}</>
    )
}