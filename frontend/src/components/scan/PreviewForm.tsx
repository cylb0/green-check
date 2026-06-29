import { useEffect, useState, type SyntheticEvent } from "react";
import { useSubmissionContext } from "../../context";
import { useMetadata } from "../../context";
import type { SubmissionPayload } from "../../types";
import { useTranslation } from "../../hooks";
import { PREVIEW_CONTENT } from "../../data";
import { ERRORS } from "../../data";
import toast from "react-hot-toast";
import { ActionButton } from "../ui";

interface PreviewFormProps {
    blob: Blob
}

export default function PreviewForm({ blob }: PreviewFormProps) {
    const { mutate:submit, error, isPending } = useSubmissionContext()
    const [formState, setFormState] = useState<SubmissionPayload>({})
    const { button, exposureLabel, loading, plantLabel, soilLabel } = useTranslation(PREVIEW_CONTENT)
    const { SUBMISSION_FAIL } = useTranslation(ERRORS)
    const metadata = useMetadata()

    useEffect(() => {
        if (error) toast.error(SUBMISSION_FAIL)
    }, [error, SUBMISSION_FAIL ])

    const fields: {
        id: string
        name: keyof SubmissionPayload
        label: string
        options: { value: string; label: string}[]
    }[] = [
        { id: 'plant', name: 'plant_type', label: plantLabel, options: metadata.plant },
        { id: 'soil', name: 'soil_type', label: soilLabel, options: metadata.soil },
        { id: 'exposure', name: 'exposure', label: exposureLabel, options: metadata.exposure },
    ]

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormState(prev => {
            const next = { ...prev, [name]: value }
            if (!value) delete next[name as keyof SubmissionPayload]
            return next
        })
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        submit({ blob, payload: formState })
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="relative w-full">
            {error && (
                <div className="input-error absolute">
                    {error.message}
                </div>
            )}

            <div className="flex flex-col gap-4">
                {fields.map((field) => (
                    <div key={field.id} className="relative">
                        <select
                            id={field.id}
                            name={field.name}
                            value={formState[field.name] ?? ""}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-700 outline-none focus:border-black transition-colors"
                        >
                            <option value="">
                                {field.label}
                            </option>
                            {field.options.map(o => (
                                <option key={o.value} value={o.value}>
                                    {o.label}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>

            <ActionButton
                type="submit"
                label={isPending ? loading : button}
                bgColor="bg-primary"
                textColor="text-white"
                borderColor="border-transparent"
            />
        </form>
    )
}
