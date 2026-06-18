import { Link } from "react-router-dom";
import { formatDiagnosticDate } from "../../services/dateUtils";
import { capitalize } from "../../services/textUtils";
import type { Diagnostic } from "../../types/diagnostics";

export default function DiagnosticCard(props: Diagnostic) {
    return (
        <Link
            to={`/diagnostic/${props.id}/result`}
            className="flex w-full bg-foreground/5 rounded-lg active:scale-110 active:shadow-lg hover:scale-110 hover:shadow-lg"
        >
            <img
                src={props.original_image_url}
                className="w-24 h-24 rounded-lg shadow-md"
                alt={props.detected_plant || "Plant image"}
            />
            <div className="p-2">
                <p className="text-lg text-foreground font-bold">{capitalize(props.plant_label)}</p>
                <p className="text-md text-foreground font-bold">{capitalize(props.disease_label)}</p>
                <p className="text-sm text-foreground/50 font-medium"><span>{formatDiagnosticDate(props.created_at)}</span> ‧ <span>{props.confidence}%</span></p>
            </div>
        </Link>
    )
}
