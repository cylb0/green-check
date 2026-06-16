import { DIAGNOSTIC_ADVICE_PAGE_CONTENT } from "../../data/diagnosticPage";

interface AdviceProps {
    text: string
    className?: string
}

export default function Advice({ text, className="" }: AdviceProps) {
    return (
        <div className={`flex flex-col w-full mt-4 gap-2 ${className}`}>
            <h2 className="text-heading-sm">{DIAGNOSTIC_ADVICE_PAGE_CONTENT.advice}</h2>
            <div className="border-2 border-foreground/20 rounded-lg p-4">
                {text}
            </div>
        </div>
    )
}
