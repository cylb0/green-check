import type { ReactNode } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import HomePage from '../pages/HomePage'
import AuthContainer from '../layouts/AuthLayout'
import MainLayout from '../layouts/MainLayout'
import HistoryPage from '../pages/HistoryPage'
import ProfilePage from '../pages/ProfilePage'
import AnalyzePage from '../pages/ScanPage'
import GuidesPage from '../pages/GuidesPage'
import AdvicesPage from '../pages/AdvicesPage'
import { ADVICES_PAGE, DIAGNOSTIC_PROCESSING_PAGE, GUIDES_PAGE, HISTORY_PAGE, HOME_PAGE, LOGIN_PAGE, PRIVACY_POLICY_PAGE, PROFILE_PAGE, SCAN_PAGE, TERMS_OF_USE_PAGE } from '../constants/pages'
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage'
import TermsOfUsePage from '../pages/TermsOfUsePage'
import DiagnosticProcessingPage from '../pages/DiagnosticProcessingPage'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-sm text-gray-500">Chargement...</span>
      </div>
    )

    if (!isAuthenticated) return <Navigate to={LOGIN_PAGE} replace />

    return <>{children}</>
}

export default function App() {
  const { isAuthenticated, isLoading } = useAuth()
  
  if (isLoading) return null

  return (
    <Routes>
      <Route path="/" element={
        isAuthenticated ? <Navigate to={HOME_PAGE} replace /> : <AuthContainer />
      } />
      <Route path={TERMS_OF_USE_PAGE} element={<TermsOfUsePage />} />
      <Route path={PRIVACY_POLICY_PAGE} element={<PrivacyPolicyPage />} />

      <Route element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path={HOME_PAGE} element={<HomePage />} />
        <Route path={HISTORY_PAGE} element={<HistoryPage />} />
        <Route path={PROFILE_PAGE} element={<ProfilePage />} />
        <Route path={GUIDES_PAGE} element={<GuidesPage />} />
        <Route path={ADVICES_PAGE} element={<AdvicesPage />} />
      </Route>
      
      <Route path={SCAN_PAGE} element={
        <ProtectedRoute>
          <AnalyzePage />
        </ProtectedRoute>
      } />

      <Route
        path={DIAGNOSTIC_PROCESSING_PAGE}
        element={
          <ProtectedRoute>
            <DiagnosticProcessingPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
