import toast from "react-hot-toast"
import * as Select from "@radix-ui/react-select"
import { useEffect, useState, type SyntheticEvent } from "react"
import { FaCheck, FaChevronDown } from "react-icons/fa6"
import { useMetadata, useSubmissionContext } from "@/context"
import type { SubmissionPayload } from "@/types"
import { useTranslation } from "@/hooks"
import { ERRORS, PREVIEW_CONTENT } from "@/data"
import { ActionButton } from "@/components"

interface PreviewFormProps {
    blob: Blob
    isAnalyzing: boolean
    isLeafDetected: boolean
}

export default function PreviewForm({ blob, isAnalyzing, isLeafDetected }: PreviewFormProps) {
    const { mutate:submit, error, isPending } = useSubmissionContext()
    const [formState, setFormState] = useState<SubmissionPayload>({})
    const { buttonContinueAnyway, buttonAnalyzing, buttonLoading, buttonSubmit, exposureLabel, plantLabel, soilLabel, warning } = useTranslation(PREVIEW_CONTENT)
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

    const handleChange = (name: keyof SubmissionPayload, value: string) => {
        setFormState(prev => {
            const next = { ...prev, [name]: value }
            if (!value) delete next[name]
            return next
        })
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        submit({ blob, payload: formState })
    }

    const buttonLabel = isPending
        ? buttonLoading
        : isAnalyzing
            ? buttonAnalyzing
            : isLeafDetected
                ? buttonSubmit
                : buttonContinueAnyway

    return (
        <form onSubmit={handleSubmit} noValidate className="relative w-full">
            {error && (
                <div className="input-error absolute">
                    {error.message}
                </div>
            )}

            <div className="flex flex-col gap-4">
                {fields.map((field) => (
                    <Select.Root
                        key={field.id}
                        value={formState[field.name] ?? ""}
                        onValueChange={(value) => handleChange(field.name, value)}
                    >
                        <Select.Trigger
                            id={field.id}
                            aria-label={field.label}
                            className="flex w-full items-center justify-between gap-2 bg-transparent border-b border-gray-300 py-2 text-gray-700 outline-none focus:border-black data-[state=open]:border-black transition-colors"
                        >
                            <Select.Value placeholder={field.label} />
                            <Select.Icon>
                                <FaChevronDown size={12} className="text-foreground/50" />
                            </Select.Icon>
                        </Select.Trigger>

                        <Select.Portal>
                            <Select.Content
                                position="popper"
                                side="bottom"
                                sideOffset={4}
                                collisionPadding={8}
                                className="z-50 w-[var(--radix-select-trigger-width)] max-h-[var(--radix-select-content-available-height)] overflow-y-auto bg-white border-2 border-primary/10 rounded-lg shadow-md"
                            >
                                <Select.Viewport className="p-1">
                                    {field.options.map(o => (
                                        <Select.Item
                                            key={o.value}
                                            value={o.value}
                                            className="flex items-center justify-between gap-2 px-3 py-2 text-sm text-gray-700 rounded outline-none cursor-pointer data-[highlighted]:bg-gray-100"
                                        >
                                            <Select.ItemText>{o.label}</Select.ItemText>
                                            <Select.ItemIndicator>
                                                <FaCheck size={12} className="text-primary" />
                                            </Select.ItemIndicator>
                                        </Select.Item>
                                    ))}
                                </Select.Viewport>
                            </Select.Content>
                        </Select.Portal>
                    </Select.Root>
                ))}
            </div>

            {!isAnalyzing && !isLeafDetected && (
                <p className="text-xs text-error italic my-4">
                    {warning}
                </p>
            )}

            <ActionButton
                type="submit"
                label={buttonLabel}
                bgColor={!isAnalyzing && !isLeafDetected ? "bg-warning" : "bg-primary"}
                textColor="text-white"
                borderColor="border-transparent"
                disabled={isAnalyzing || isPending}
            />
        </form>
    )
}
