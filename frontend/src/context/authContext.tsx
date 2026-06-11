import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authApi, type User } from "../api/auth";

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    register: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        authApi.me()
            .then(setUser)
            .catch(() => setUser(null))
            .finally(() => setIsLoading(false))
    }, [])

    const login = async (email: string, password: string) => {
        const user = await authApi.login(email, password)
        setUser(user)
    }

    const logout = async () => {
        await authApi.logout()
        setUser(null)
    }

    const register = async (email: string, password: string) => {
        const user = await authApi.register(email, password)
        setUser(user)
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            login,
            logout,
            register
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within a AuthProvider')
    return context
}
