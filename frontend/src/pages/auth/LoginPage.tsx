import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context'
import { useAuthNav } from '../../context'
import { useTranslation } from '../../hooks'
import { DotAuthNav, LoginForm } from '../../components'
import { LOGIN_CONTENT } from '../../data'
import { CgProfile } from "react-icons/cg"
import { FaArrowLeft } from 'react-icons/fa'

export default function LoginPage() {
    const { isAuthenticated, isLoading } = useAuth()
    const { goTo } = useAuthNav()
    const { signIn, noAccount, signUp } = useTranslation(LOGIN_CONTENT)

    if (isLoading) return null

    if (isAuthenticated) return <Navigate to="/" replace />

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
            <div className="flex justify-center items-center w-full text-foreground">
                <button onClick={() => goTo(0)} className="z-20">
                    <FaArrowLeft size={20} className="transition-transform duration-200 hover:scale-150" />
                </button>
                <h1 className="flex-1 text-heading text-center py-4">{signIn}</h1>
                <div className="w-4"></div>
            </div>
            <CgProfile className="w-1/4 h-auto text-primary/30 my-4" />
            <LoginForm />
            <div className="flex text-right mt-4 gap-4">
                <span className="text-sm text-foreground font-bold">{noAccount}</span>
                <button onClick={() => goTo(2)} className="text-sm font-bold text-foreground/50 underline active:scale-110 hover:scale-110">
                    <span>{signUp}</span>
                </button>
            </div>
            <DotAuthNav />
        </div>
    )
}
