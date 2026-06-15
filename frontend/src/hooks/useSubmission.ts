import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { SubmissionPayload, SubmissionResponse } from "../types/plant_submissions"
import apiFetch from "../api/client"

export function useSubmission() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const submit = async (blob: Blob, payload: SubmissionPayload = {}) => {
        setIsLoading(true)
        setError(null)

        try {
            const formData = new FormData()
            formData.append('image', blob, 'capture.jpg')
            formData.append('payload', JSON.stringify(payload))

            const data = await apiFetch<SubmissionResponse>('/api/submissions', {
                method: 'POST',
                body: formData
            })

            navigate(`/diagnostic/${data.diagnostic_id}/processing`)
        } catch (err) {
            console.error(err)
            setError('Une erreur est survenue')
        } finally {
            setIsLoading(false)
        }
    }

    return { submit, isLoading, error }
}
