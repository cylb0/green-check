import { useState, type SyntheticEvent } from "react";
import { useSubmissionContext } from "../../context/SubmissionContext";
import { useMetadata } from "../../context/MetaDataContext";
import type { SubmissionPayload } from "../../types/plant_submissions";

interface PreviewFormProps {
    blob: Blob
}

export default function PreviewForm({ blob }: PreviewFormProps) {
    const { submit } = useSubmissionContext()
    const [formState, setFormState] = useState<SubmissionPayload>({})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string>("")

    const metadata = useMetadata()

    const fields: {
        id: string
        name: keyof SubmissionPayload
        label: string
        options: { value: string; label: string}[]
    }[] = [
        { id: 'plant', name: 'plant_type', label: "Plant", options: metadata.plant },
        { id: 'soil', name: 'soil_type', label: "Soil", options: metadata.soil },
        { id: 'exposure', name: 'exposure', label: "Exposure", options: metadata.exposure },
    ]

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormState(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            await submit(blob, formState)
        } catch (error) {
            console.error(error)
            setError("An error occured, please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="relative w-full">
            {error && (
                <div className="input-error absolute">
                    {error}
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
                            className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-700 outline-none focus:border-black transition-colors"                        >
                            <option value="">{field.label}</option>
                            {field.options.map(o => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                    </div>
                ))}
            </div> 

            <button
                type="submit"
                className="w-full bg-primary/80 text-white rounded-lg p-2 mt-4"
                disabled={isLoading}
            >
                {isLoading ? 'Loading...' : 'Submit'}
            </button>
        </form>

    )

}