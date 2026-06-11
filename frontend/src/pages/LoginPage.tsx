import { Navigate } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import { useAuth } from '../context/authContext'
import { CgProfile } from "react-icons/cg"
import { FaArrowLeft } from "react-icons/fa6";

export default function LoginPage() {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) return null

    if (isAuthenticated) return <Navigate to="/" replace />

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
            <div className="flex justify-center items-center w-full text-primary/80">
                <FaArrowLeft size={20} />
                <h1 className="text-xl font-bold flex-1 text-center py-4 text-primary">Login</h1>
                <div className="w-4"></div>
            </div>
            <CgProfile className="w-1/4 h-auto text-primary/30 my-4" />
            <LoginForm />
            <div className="flex text-right mt-4 gap-4">
                <span className="text-sm text-primary/80 font-bold">Pas encore de compte ?</span>
                <a href="/forgot-password" className="text-sm font-bold text-primary/50 underline">
                    <span>S'inscrire</span>
                </a>
            </div>
        </div>
    )
}
