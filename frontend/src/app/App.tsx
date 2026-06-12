import type { ReactNode } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import HomePage from '../pages/HomePage'
import AuthContainer from '../layouts/AuthLayout'

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
  const { isAuthenticated, isLoading } = useAuth()
  
  if (isLoading) return null

  return (
    <Routes>
      <Route path="/" element={
        isAuthenticated ? <Navigate to="/home" replace /> : <AuthContainer />
      } />
      <Route path="/home" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
