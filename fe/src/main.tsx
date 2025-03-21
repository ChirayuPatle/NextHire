import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppProvider } from './context/AppContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <AppProvider>
    <App />
      </AppProvider>
    </Router>
  </StrictMode>,
)
