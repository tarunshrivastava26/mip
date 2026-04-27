import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { TaskProvider } from './context/TaskContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <App />
          <Toaster position="bottom-right" toastOptions={{ style: { background: '#1A1525', color: '#F5F3FA', border: '1px solid #2A2238' } }} />
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
