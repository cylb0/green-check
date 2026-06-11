import type { ReactNode } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import LoginPage from '../pages/LoginPage'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-sm text-gray-500">Chargement...</span>
      </div>
    )

    if (!isAuthenticated) return <Navigate to="/login" replace />

    return <>{children}</>
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={
        <ProtectedRoute>
          <div>Home</div>
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
