import { Link } from "react-router-dom";
import { capitalize, formatDiagnosticDate } from "@/services";
import { isDiagnosticError, isDiagnosticPending } from "@/constants";
import { DIAGNOSTIC_CARD_STATUS } from "@/data";
import { useTranslation } from "@/hooks";
import type { Diagnostic } from "@/types";
import { SeverityBadge } from "@/components";

export default function DiagnosticCard(props: Diagnostic) {
    const { error, pending } = useTranslation(DIAGNOSTIC_CARD_STATUS)
    const isPending = isDiagnosticPending(props.status)
    const hasError = isDiagnosticError(props.status)

    const page = isPending ? "processing"
        : hasError ? "error"
        : "result"

    const status = isPending ? { ...pending, style: "bg-ink-900/8 text-ink-600" }
        : hasError ? { ...error, style: "bg-error/10 text-error" }
        : null

    return (
        <Link
            to={`/diagnostic/${props.id}/${page}`}
            className="flex gap-3 items-center w-full p-3 rounded-2xl
                bg-paper/50 backdrop-blur-md border border-paper/60
                transition-all duration-150
                hover:-translate-y-0.5 hover:bg-paper/70 hover:shadow-md hover:border-paper/80
                active:translate-y-0 active:scale-95"
        >
            <img
                src={props.original_image_url}
                className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                alt={props.detected_plant || "Plant image"}
            />
            <div className="flex-1 min-w-0">
                {status ? (
                    <p className="text-sm font-semibold text-ink-600 truncate">{status.hint}</p>
                ) : (
                    <>
                        <p className="text-sm font-bold text-ink-900 truncate">{capitalize(props.plant_label ?? "")}</p>
                        <p className="text-xs font-semibold text-ink-600 truncate">{capitalize(props.disease_label ?? "")}</p>
                    </>
                )}
                <p className="text-xs text-ink-400 font-medium">
                    <span>{formatDiagnosticDate(props.created_at)}</span>
                    {props.confidence !== null && <> ‧ <span>{(props.confidence * 100).toFixed(0)}%</span></>}
                </p>
            </div>
            {status ? (
                <span className={`text-xs font-bold py-1 px-2.5 rounded-lg flex-shrink-0 ${status.style}`}>
                    {status.label}
                </span>
            ) : (
                <SeverityBadge severity={props.severity} />
            )}
        </Link>
    )
}
