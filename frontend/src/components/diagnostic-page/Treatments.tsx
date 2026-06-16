import { DIAGNOSTIC_ADVICE_PAGE_CONTENT } from "../../data/diagnosticPage";

export default function Treatments() {
    return (
        <div className="flex flex-col mt-4 gap-2">
            <h2 className="text-heading-sm">{DIAGNOSTIC_ADVICE_PAGE_CONTENT.treatments}</h2>
            ...
        </div>
    )
}