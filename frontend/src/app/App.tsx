import type { ReactNode } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import HomePage from '../pages/HomePage'
import AuthContainer from '../layouts/AuthLayout'
import MainLayout from '../layouts/MainLayout'
import HistoryPage from '../pages/HistoryPage'
import ProfilePage from '../pages/ProfilePage'

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
      <Route element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path="/home" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
