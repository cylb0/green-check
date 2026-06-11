import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import RegisterForm from '../components/auth/RegisterForm';
import { useAuthNav } from '../context/authNavContext';
import { FaArrowLeft } from 'react-icons/fa';
import DotAuthNav from '../components/auth/DotAuthNav';

export default function RegisterPage() {
    const { isAuthenticated, isLoading } = useAuth()
    const { goTo } = useAuthNav()

    if (isLoading) return null

    if (isAuthenticated) return <Navigate to="/" replace />

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
            <div className="flex justify-center items-center w-full text-primary/80">
                <button onClick={() => goTo(0)} className="z-20">
                    <FaArrowLeft size={20} className="transition-transform duration-200 hover:scale-150" />
                </button>
                <h1 className="text-xl font-bold flex-1 text-center py-4 text-primary">Sign up</h1>
                <div className="w-4"></div>
            </div>
            <RegisterForm />
            <div className="flex text-right gap-4">
                <span className="text-sm text-primary/80 font-bold">Already have an account ?</span>
                <button onClick={() => goTo(1)} className="text-sm font-bold text-primary/50 underline active:scale-110 hover:scale-110">
                    <span>Sign in</span>
                </button>
            </div>
            <DotAuthNav />
        </div>
    )
}
