import { Navigate } from 'react-router-dom'
import { DotAuthNav, RegisterForm } from '@/components';
import { useAuth, useAuthNav } from '@/context'
import { useTranslation } from '@/hooks';
import { LOGIN_CONTENT } from '@/data';
import { FaArrowLeft } from 'react-icons/fa';

export default function RegisterPage() {
    const { isAuthenticated, isLoading } = useAuth()
    const { goTo } = useAuthNav()
    const { signUp, accountAlready, signIn } = useTranslation(LOGIN_CONTENT)

    if (isLoading) return null

    if (isAuthenticated) return <Navigate to="/" replace />

    return (
        <div className="min-h-dvh flex flex-col items-center justify-center gap-6 px-4">
            <div className="flex justify-center items-center w-full text-ink-inverse">
                <button
                    onClick={() => goTo(0)}
                    className="p-2 -m-2 rounded-full z-20 text-ink-inverse/80
                    transition duration-150
                    hover:bg-ink-inverse/10 hover:text-ink-inverse
                    active:scale-90"
                >
                    <FaArrowLeft size={20} />
                </button>
                <h1 className="flex-1 text-center py-4 title-lg">{signUp}</h1>
                <div className="w-4"></div>
            </div>
            <RegisterForm />
            <div className="flex text-right gap-4">
                <span className="body text-ink-inverse/60 font-bold">{accountAlready}</span>
                <button
                    onClick={() => goTo(1)}
                    className="body-strong text-primary-light
                    transition duration-150
                    hover:brightness-110 hover:underline underline-offset-2
                    active:scale-95"
                >
                    <span>{signIn}</span>
                </button>
            </div>
            <DotAuthNav />
        </div>
    )
}
