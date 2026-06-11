import { createRoot } from 'react-dom/client'
import './style/global.css'
import App from './app/App'
import { AuthProvider } from './context/authContext'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)
