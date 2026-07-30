import type { ReactNode } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/context'
import { AuthLayout, DiagnosticLayout, MainLayout } from '@/layouts'
import {
  AdvicePage,
  DiagnosticAdvicePage,
  DiagnosticErrorPage,
  DiagnosticProcessingPage,
  DiagnosticResultPage,
  GuidesPage,
  HomePage,
  HistoryPage,
  PrivacyPolicyPage,
  ProfilePage,
  ScanPage,
  TermsOfUsePage
} from '@/pages'
import { 
  ADVICE_PAGE, 
  DIAGNOSTIC_ADVICE_PAGE,
  DIAGNOSTIC_ERROR_PAGE,
  DIAGNOSTIC_PROCESSING_PAGE,
  DIAGNOSTIC_RESULT_PAGE,
  GUIDES_PAGE,
  HISTORY_PAGE,
  HOME_PAGE,
  LANDING_PAGE,
  LOGIN_PAGE,
  PRIVACY_POLICY_PAGE,
  PROFILE_PAGE,
  REGISTER_PAGE,
  SCAN_PAGE,
  TERMS_OF_USE_PAGE
} from '@/constants'
import { Toaster } from 'react-hot-toast'
import { GardenBackground } from '@/components'

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
  const { isLoading } = useAuth()

  if (isLoading) return null

  return (
    <>
      <GardenBackground />
      <div className="relative z-10">
        <Routes>
          <Route path={LANDING_PAGE} element={<AuthLayout />} />
          <Route path={LOGIN_PAGE} element={<AuthLayout />} />
          <Route path={REGISTER_PAGE} element={<AuthLayout />} />

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
            <Route path={ADVICE_PAGE} element={<AdvicePage />} />
          </Route>
          
          <Route path={SCAN_PAGE} element={
            <ProtectedRoute>
              <ScanPage />
            </ProtectedRoute>
          } />

          <Route
            element={
              <ProtectedRoute>
                <DiagnosticLayout />
              </ProtectedRoute>
            }
          >
            <Route path={DIAGNOSTIC_PROCESSING_PAGE} element={<DiagnosticProcessingPage />} />
            <Route path={DIAGNOSTIC_RESULT_PAGE} element={<DiagnosticResultPage />} />
            <Route path={DIAGNOSTIC_ERROR_PAGE} element={<DiagnosticErrorPage />} />
            <Route path={DIAGNOSTIC_ADVICE_PAGE} element={<DiagnosticAdvicePage />} />
          </Route>

          <Route path="*" element={<Navigate to={LANDING_PAGE} replace />} />
        </Routes>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  )
}
