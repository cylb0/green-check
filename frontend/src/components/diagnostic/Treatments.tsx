import { DIAGNOSTIC_ADVICE_PAGE_CONTENT } from "../../data"
import { useTranslation } from "../../hooks"

export default function Treatments() {
    const { treatments } = useTranslation(DIAGNOSTIC_ADVICE_PAGE_CONTENT)

    return (
        <div className="flex flex-col mt-4 gap-2">
            <h2 className="text-heading-sm">{treatments}</h2>
            ...
        </div>
    )
}
