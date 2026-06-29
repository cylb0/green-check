import { createContext, useContext, type ReactNode } from "react";
import { useSubmission } from "@/hooks";

type SubmissionContextType = ReturnType<typeof useSubmission>

const SubmissionContext = createContext<SubmissionContextType | null>(null)

export const SubmissionProvider = ({ children }: { children: ReactNode }) => {
    const submission = useSubmission()
    return (
        <SubmissionContext.Provider value={submission}>
            {children}
        </SubmissionContext.Provider>
    )
}

export function useSubmissionContext() {
    const context = useContext(SubmissionContext)
    if (!context) throw new Error('useSubmissionContext must be used within an SubmissionContextProvider')
    return context
}
