import { DIAGNOSTIC_ADVICE_PAGE_CONTENT } from "@/data"
import { useTranslation } from "@/hooks"
import type { Treatment } from "@/types"
import { TREATMENT_ICONS } from "@/data"
import { capitalize } from "@/services"

function Treatment({ treatment }: { treatment: Treatment }) {
    const Icon = treatment.icon ? TREATMENT_ICONS[treatment.icon] : null

    return (
        <div className="flex items-center gap-4 p-4
            rounded-2xl bg-ink-inverse/10 backdrop-blur-md border border-ink-inverse/15"
        >
            <div className={`flex items-center justify-center min-w-[48px] h-12 w-12 rounded-full border
                ${Icon ? 'border-primary-light/40 bg-primary-light/10' : 'border-transparent'}`}
            >
                {Icon && <Icon className="text-primary-light w-5 h-5" />}
            </div>
            <div className="flex flex-col justify-center flex-1">
                <p className="text-md font-bold text-ink-inverse">{capitalize(treatment.title)}</p>
                <p className="text-sm text-ink-inverse mt-0.5 leading-normal">{capitalize(treatment.description)}</p>
            </div>
        </div>
    )
}

interface TreatmentProps {
    data: Treatment[]
}

export default function Treatments({ data }: TreatmentProps) {
    const { treatments } = useTranslation(DIAGNOSTIC_ADVICE_PAGE_CONTENT)

    return (
        <div className="flex flex-col mt-4 gap-2">
            <h2 className="text-heading-sm text-ink-inverse">{treatments}</h2>
            <div className="flex flex-col gap-4">
                {data.map((treatment, idx) => (
                    <Treatment key={`treat-${idx}`} treatment={treatment} />
                ))}
            </div>
        </div>
    )
}
