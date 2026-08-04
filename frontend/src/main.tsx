import { createRoot } from 'react-dom/client'
// Polices — DESIGN.md §3.5. Importées ici et non depuis global.css : le plugin
// Tailwind v4 inline les @import avec son propre résolveur et ne réécrit pas
// les url() relatives, ce qui laisse les .woff2 en 404.
import '@fontsource-variable/manrope'
import '@fontsource/baloo-2/latin-700.css'
import '@fontsource/baloo-2/latin-800.css'
import './style/global.css'
import App from './app/App'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { MetadataProvider } from './context/MetaDataContext'
import { LanguageProvider } from './context/LanguageContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <MetadataProvider>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </MetadataProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  </QueryClientProvider>
)
