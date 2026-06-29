import { Link } from "react-router-dom";
import { capitalize, formatDiagnosticDate } from "../../services";
import type { Diagnostic } from "../../types";
import { SeverityBadge } from "..";

interface DiagnosticCardProps extends Diagnostic {
    showSeparator: boolean
}

export default function DiagnosticCard(props: DiagnosticCardProps) {
    return (
        <div className="flex flex-col mt-2">
            <Link
                to={`/diagnostic/${props.id}/result`}
                className="flex gap-2 items-center w-full active:scale-110 active:shadow-lg hover:scale-110 hover:shadow-lg overflow-hidden"
            >
                <img
                    src={props.original_image_url}
                    className="w-12 h-12 rounded-lg"
                    alt={props.detected_plant || "Plant image"}
                />
                <div>
                    <p className="text-md text-foreground font-bold">{capitalize(props.plant_label)}</p>
                    <p className="text-sm text-foreground font-bold">{capitalize(props.disease_label)}</p>
                    <p className="text-xs text-foreground/50 font-medium">
                        <span>{formatDiagnosticDate(props.created_at)}</span> ‧ <span>{(props.confidence * 100).toFixed(0)}%</span>
                    </p>
                </div>
                <SeverityBadge severity={props.severity} />
            </Link>

            {props.showSeparator && (
                <hr className="text-foreground/20 mt-2 w-80/100 self-center" />
            )}
        </div>
    )
}
