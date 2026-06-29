import { createRoot } from 'react-dom/client'
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
