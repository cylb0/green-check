import { useNavigate } from "react-router-dom"
import type { SubmissionPayload, SubmissionResponse } from "../types/plant_submissions"
import apiFetch from "../api/client"
import { useMutation } from "@tanstack/react-query"

export function useSubmission() {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async ({ blob, payload = {} }: { blob: Blob, payload?: SubmissionPayload }) => {
            const formData = new FormData()
            formData.append("image", blob, "capture.jpg")
            formData.append("payload", JSON.stringify(payload))

            return await apiFetch<SubmissionResponse>('/api/submissions', {
                method: "POST",
                body: formData
            })
        },
        onSuccess: (data) => navigate(`/diagnostic/${data.diagnostic_id}/processing`)
    })
}
