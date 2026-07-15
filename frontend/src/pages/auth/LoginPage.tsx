import { Navigate } from 'react-router-dom'
import { DotAuthNav, LoginForm } from '@/components'
import { useAuth, useAuthNav } from '@/context'
import { useTranslation } from '@/hooks'
import { LOGIN_CONTENT } from '@/data'
import { FiUser } from "react-icons/fi";
import { FaArrowLeft } from 'react-icons/fa'

export default function LoginPage() {
    const { isAuthenticated, isLoading } = useAuth()
    const { goTo } = useAuthNav()
    const { signIn, noAccount, signUp } = useTranslation(LOGIN_CONTENT)

    if (isLoading) return null

    if (isAuthenticated) return <Navigate to="/" replace />

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
            <div className="flex justify-center items-center w-full text-ink-inverse">
                <button
                    onClick={() => goTo(0)}
                    className="p-2 -m-2 rounded-full z-20 text-ink-inverse/80
                    transition-all duration-150
                    hover:bg-ink-inverse/10 hover:text-ink-inverse
                    active:scale-90"
                >
                    <FaArrowLeft size={20} />
                </button>
                <h1 className="flex-1 text-heading text-center py-4">{signIn}</h1>
                <div className="w-4"></div>
            </div>
            <div className="w-20 h-20 rounded-full bg-ink-inverse/10 border-2 border-ink-inverse/20 flex items-center justify-center">
                <FiUser className="w-1/2 h-auto text-ink-inverse/50 my-4" />
            </div>
            <LoginForm />
            <div className="flex text-right mt-4 gap-4">
                <span className="text-sm text-ink-inverse/60 font-bold">{noAccount}</span>
                <button
                    onClick={() => goTo(1)}
                    className="text-sm font-bold text-primary-light
                    transition-all duration-150
                    hover:brightness-110 hover:underline underline-offset-2
                    active:scale-95"
                >
                    <span>{signUp}</span>
                </button>
            </div>
            <DotAuthNav />
        </div>
    )
}
