import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi, type User } from "@/api";
import { LOGIN_PAGE, QUERY_CONFIG } from "@/constants";

interface AuthContextType {
    user: User | null | undefined
    isAuthenticated: boolean
    isLoading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    register: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    useEffect(() => {
        const handler = () => {
            queryClient.setQueryData(["me"], null)
            navigate(LOGIN_PAGE)
        }

        window.addEventListener("auth:expired", handler)
        return () => window.removeEventListener("auth:expired", handler)
    }, [queryClient, navigate])

    const { data: user, isLoading } = useQuery({
        queryKey: ["me"],
        queryFn: authApi.me,
        retry: false,
        staleTime: QUERY_CONFIG.AUTH_STALE_TIME
    })

    const login = async (email: string, password: string) => {
        await authApi.login(email, password)
        queryClient.invalidateQueries({ queryKey: ["me"] })
    }

    const logout = async () => {
        await authApi.logout()
        queryClient.setQueryData(["me"], null)
    }

    const register = async (email: string, password: string) => {
        await authApi.register(email, password)
        queryClient.invalidateQueries({ queryKey: ["me"] })
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
