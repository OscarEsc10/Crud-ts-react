import './App.css'
import React, { useState } from 'react'
import { useAuth } from './contexts/AuthContext'
import Login from './components/Login'
import Register from './components/Register'
import UserList from './hooks/useList'

function App() {
  const { isAuthenticated, login, logout } = useAuth()
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')

  const handleLogin = (user: any) => {
    login(user)
  }

  const handleLogout = () => {
    logout()
  }

  if (!isAuthenticated) {
    return authMode === 'login' ? (
      <Login onLogin={handleLogin} onSwitchToRegister={() => setAuthMode('register')} />
    ) : (
      <Register onSwitchToLogin={() => setAuthMode('login')} />
    )
  }

  return (
    <>
      <div className="flex min-h-screen p-6 justify-center items-start">
        <div className="w-full max-w-6xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">User Management System</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
          <UserList />
        </div>
      </div>
    </>
  );
}

export default App
