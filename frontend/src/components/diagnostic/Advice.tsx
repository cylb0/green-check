import { Card } from "..";
import { DIAGNOSTIC_ADVICE_PAGE_CONTENT } from "../../data";
import { useTranslation } from "../../hooks";

interface AdviceProps {
    text: string
    className?: string
}

export default function Advice({ text, className="" }: AdviceProps) {
    const { advice } = useTranslation(DIAGNOSTIC_ADVICE_PAGE_CONTENT)
    return (
        <div className={`flex flex-col w-full mt-4 gap-2 ${className}`}>
            <h2 className="text-heading-sm">{advice}</h2>
            <Card>
                {text}
            </Card>
        </div>
    )
}
