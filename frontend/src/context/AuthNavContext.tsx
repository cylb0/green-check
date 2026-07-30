import { createContext, useContext, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LANDING_PAGE, LOGIN_PAGE, REGISTER_PAGE } from "@/constants";

const AUTH_STEP_PATHS = [LANDING_PAGE, LOGIN_PAGE, REGISTER_PAGE]

interface AuthNavContextType {
    step: number
    direction: number
    goTo: (s: number) => void
}

const AuthNavContext = createContext<AuthNavContextType | null>(null)

export function AuthNavProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const index = AUTH_STEP_PATHS.indexOf(pathname)
    const step = index === -1 ? 0 : index

    const [previousStep, setPreviousStep] = useState(step)
    const [direction, setDirection] = useState(1)

    if (previousStep !== step) {
        setDirection(step > previousStep ? 1 : -1)
        setPreviousStep(step)
    }

    const goTo = (nextStep: number) => {
        const path = AUTH_STEP_PATHS[nextStep]
        if (path) navigate(path)
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
