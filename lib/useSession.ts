import { useState, useEffect } from 'react'
import { sessionManager } from './sessionManager'

interface SessionData {
  isLoggedIn: boolean
  username: string
  loginTime: string
}

export const useSession = () => {
  const [session, setSession] = useState<SessionData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar sesión inicial
    const checkInitialSession = () => {
      if (typeof window === 'undefined') {
        setLoading(false)
        return
      }

      const sessionData = sessionManager.getSessionData()
      setSession(sessionData)
      setLoading(false)
      
      if (sessionData) {
        console.log('🔐 Sesión encontrada:', sessionData.username)
      } else {
        console.log('❌ No hay sesión activa')
      }
    }

    checkInitialSession()

    // Suscribirse a cambios de sesión
    const unsubscribe = sessionManager.subscribe((sessionData) => {
      setSession(sessionData)
      setLoading(false)
      
      if (sessionData) {
        console.log('🔄 Sesión actualizada:', sessionData.username)
      } else {
        console.log('🚪 Sesión cerrada')
      }
    })

    return unsubscribe
  }, [])

  const login = (username: string) => {
    sessionManager.login(username)
  }

  const logout = () => {
    sessionManager.logout()
  }

  return {
    isAuthenticated: session?.isLoggedIn || false,
    user: session?.username || null,
    loading,
    login,
    logout
  }
}
