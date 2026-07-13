import { DIAGNOSTIC_ADVICE_PAGE_CONTENT } from "@/data"
import { useTranslation } from "@/hooks"
import type { Treatment } from "@/types"
import { TREATMENT_ICONS } from "@/data"
import { capitalize } from "@/services"

function Treatment({ treatment }: { treatment: Treatment}) {
    const Icon = treatment.icon ? TREATMENT_ICONS[treatment.icon] : null

    return (
        <div className="flex items-center gap-4 p-4">
            <div className={`flex items-center justify-center min-w-[48px] h-12 w-12 rounded-full border text-foreground/60 ${
                Icon ? 'border-primary hover active:text-primary/80 hover:active:text-primary/80' : 'border-transparent'
            }`}>
                {Icon && <Icon className="text-primary active:text-primary/80 w-5 h-5" />}
            </div>
            <div className="flex flex-col justify-center flex-1">
                <p className="text-heading-sm">{capitalize(treatment.title)}</p>
                <p className="text-sm text-foreground-500 mt-0.5 leading-normal">{capitalize(treatment.description)}</p>
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
            <h2 className="text-heading-sm">{treatments}</h2>
            <div className="border-2 border-primary/10 bg-primary/5 rounded-xl">
                {data.map((treatment, idx) => {
                    return (
                        <div key={`treat-${idx}`} className="flex flex-col">
                            <Treatment treatment={treatment} />
                            {((idx == 0) || (idx == data.length - 1)) && <hr className="text-foreground/20 mt-2 w-80/100 self-center" />}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
