import { createRoot } from 'react-dom/client'
import './style/global.css'
import App from './app/App'
import { AuthProvider } from './context/authContext'
import { BrowserRouter } from 'react-router-dom'
import { MetadataProvider } from './context/MetaDataContext'
import { LanguageProvider } from './context/LanguageContext'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <LanguageProvider>
      <AuthProvider>
        <MetadataProvider>
          <App />
        </MetadataProvider>
      </AuthProvider>
    </LanguageProvider>
  </BrowserRouter>
)
