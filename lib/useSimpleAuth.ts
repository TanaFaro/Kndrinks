import { useState, useEffect } from 'react'
import { isLoggedIn, getCurrentUser, login, logout } from './simpleAuth'

export function useSimpleAuth() {
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar autenticación inicial
    const checkAuth = () => {
      if (typeof window === 'undefined') {
        setLoading(false)
        return
      }

      const loggedIn = isLoggedIn()
      const currentUser = getCurrentUser()
      
      console.log('🔐 Verificando autenticación simple:', { loggedIn, currentUser })
      
      setAuthenticated(loggedIn)
      setUser(currentUser)
      setLoading(false)
    }

    checkAuth()

    // Verificar cada 5 segundos
    const interval = setInterval(checkAuth, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleLogin = (username: string) => {
    login(username)
    setAuthenticated(true)
    setUser(username)
  }

  const handleLogout = () => {
    logout()
    setAuthenticated(false)
    setUser(null)
  }

  return {
    isAuthenticated: authenticated,
    user,
    loading,
    login: handleLogin,
    logout: handleLogout
  }
}
