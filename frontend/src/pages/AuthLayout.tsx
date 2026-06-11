import { Navigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { motion, AnimatePresence, type Transition } from "framer-motion"
import LoginPage from "./LoginPage"
import LandingPage from "./LandingPage"
import RegisterPage from "./RegisterPage"
import { AuthNavProvider, useAuthNav } from "../context/authNavContext"

const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%" }),
    center: { x: 0 },
    exit: (direction: number) => ({ x: direction < 0 ? "100%" : "-100%" })
}

const transition: Transition = { type: 'spring', stiffness: 400, damping: 40 }

export default function AuthContainer() {
    return (
        <AuthNavProvider>
            <AuthLayout />
        </AuthNavProvider>
    )
}

function AuthLayout() {
    const { isAuthenticated, isLoading } = useAuth()
    const { step, direction, goTo } = useAuthNav()
    
    if (isLoading) return null

    if (isAuthenticated) return <Navigate to="/home" replace />

    return (
        <div className="relative w-full h-screen overflow-hidder">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                    key={step}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={transition}
                    className="absolute inset-0"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                        if (info.offset.x < -50 && step < 2) goTo(step + 1)
                            if (info.offset.x > 50 && step > 0) goTo(step - 1)
                            }}
                        >
                    {step === 0 && <LandingPage/>}
                    {step === 1 && <LoginPage />}
                    {step === 2 && <RegisterPage />}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}