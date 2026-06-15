import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface SubmissionPayload {
    plant_type?: string
    latitude?: string
    longitude?: string
    exposure?: string
    soil_type?: string
}

function getCsrfToken(): string {
    const cookie = document.cookie
        .split(';')
        .find(c => c.trim().startsWith('csrftoken='))
    return cookie ? cookie.split('=')[1].trim() : ''
}

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

            const response = await fetch('/api/submissions', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'X-CSRFToken': getCsrfToken(),
                },
                body: formData
            })

            if (!response.ok) throw new Error('Submission failed')

            const data = await response.json()
            navigate(`/diagnostic/${data.id}`)
        } catch (err) {
            setError('Une erreur est survenue')
        } finally {
            setIsLoading(false)
        }
    }

    return { submit, isLoading, error }
}
