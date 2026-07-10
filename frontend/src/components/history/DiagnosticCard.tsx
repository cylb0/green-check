import { Link } from "react-router-dom";
import { capitalize, formatDiagnosticDate } from "@/services";
import type { Diagnostic } from "@/types";
import { SeverityBadge } from "@/components";

interface DiagnosticCardProps extends Diagnostic {
    showSeparator: boolean
}

export default function DiagnosticCard(props: DiagnosticCardProps) {
    return (
        <div className="flex flex-col mt-2">
            <Link
                to={`/diagnostic/${props.id}/result`}
                className="group flex gap-3 items-center w-full p-2 rounded-xl transition-all duration-200 ease-in-out hover:bg-foreground/5 active:scale-[0.98]"
            >
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                        src={props.original_image_url}
                        className="w-12 h-12 rounded-lg"
                        alt={props.detected_plant || "Plant image"}
                    />
                </div>
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
