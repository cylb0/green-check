export interface PlantSubmission {
    id: string
    plant_type?: string
    latitude?: string
    longitude?: string
    exposure?: string
    soil_type?: string
    image: string
    submitted_at: string
}

export type SubmissionPayload = Omit<PlantSubmission, "id" | "image" | "submitted_at">

export interface SubmissionResponse {
    submission: PlantSubmission
    diagnostic_id: string
} 
