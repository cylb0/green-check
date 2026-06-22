import { useNavigate } from "react-router-dom"
import type { SubmissionPayload, SubmissionResponse } from "../types/plant_submissions"
import apiFetch from "../api/client"
import { useMutation } from "@tanstack/react-query"
import { API_SUBMISSIONS } from "../constants/api"

export function useSubmission() {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async ({ blob, payload = {} }: { blob: Blob, payload?: SubmissionPayload }) => {
            const formData = new FormData()
            formData.append("image", blob, "capture.jpg")
            formData.append("payload", JSON.stringify(payload))

            return await apiFetch<SubmissionResponse>(API_SUBMISSIONS, {
                method: "POST",
                body: formData
            })
        },
        onSuccess: (data) => navigate(`/diagnostic/${data.diagnostic_id}/processing`)
    })
}
