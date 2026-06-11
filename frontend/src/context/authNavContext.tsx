import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthNavContextType {
    step: number
    direction: number
    goTo: (s: number) => void
}

const AuthNavContext = createContext<AuthNavContextType | null>(null)

export function AuthNavProvider({ children }: { children: ReactNode }) {
    const [step, setStep] = useState(0)
    const [direction, setDirection] = useState(1)

    const goTo = (nextStep: number) => {
        setDirection(nextStep > step ? 1 : -1)
        setStep(nextStep)
    }

    return (
        <AuthNavContext.Provider value={{ step, direction, goTo }}>
            {children}
        </AuthNavContext.Provider>
    )
}

export function useAuthNav() {
    const context = useContext(AuthNavContext)
    if (!context) throw new Error('useAuthNav must be used within an AuthNavProvider')
    return context
}
