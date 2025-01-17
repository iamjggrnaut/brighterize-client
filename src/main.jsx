import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthContext, { AuthProvider } from './service/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router >
      <AuthProvider>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </AuthProvider>
    </Router>
  </StrictMode>,
)
