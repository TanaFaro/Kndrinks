/**
 * Gestor de sesión más simple y robusto
 */

interface SessionData {
  isLoggedIn: boolean
  username: string
  loginTime: string
}

class SessionManager {
  private static instance: SessionManager
  private listeners: Array<(session: SessionData | null) => void> = []

  private constructor() {}

  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager()
    }
    return SessionManager.instance
  }

  // Verificar si hay una sesión válida
  isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false
    
    try {
      const sessionData = this.getSessionData()
      return sessionData !== null && sessionData.isLoggedIn
    } catch (error) {
      console.error('❌ Error verificando sesión:', error)
      return false
    }
  }

  // Obtener datos de la sesión
  getSessionData(): SessionData | null {
    if (typeof window === 'undefined') return null
    
    try {
      const isLoggedIn = localStorage.getItem('adminLoggedIn')
      const username = localStorage.getItem('adminUser')
      const loginTime = localStorage.getItem('adminLoginTime')
      
      if (isLoggedIn === 'true' && username && loginTime) {
        return {
          isLoggedIn: true,
          username,
          loginTime
        }
      }
      return null
    } catch (error) {
      console.error('❌ Error obteniendo datos de sesión:', error)
      return null
    }
  }

  // Iniciar sesión
  login(username: string): void {
    if (typeof window === 'undefined') return
    
    try {
      const sessionData: SessionData = {
        isLoggedIn: true,
        username,
        loginTime: new Date().toISOString()
      }
      
      localStorage.setItem('adminLoggedIn', 'true')
      localStorage.setItem('adminUser', username)
      localStorage.setItem('adminLoginTime', sessionData.loginTime)
      
      console.log('✅ Sesión iniciada:', sessionData)
      this.notifyListeners(sessionData)
    } catch (error) {
      console.error('❌ Error iniciando sesión:', error)
    }
  }

  // Cerrar sesión
  logout(): void {
    if (typeof window === 'undefined') return
    
    try {
      const sessionData = this.getSessionData()
      console.log('👋 Cerrando sesión:', sessionData?.username)
      
      localStorage.removeItem('adminLoggedIn')
      localStorage.removeItem('adminUser')
      localStorage.removeItem('adminLoginTime')
      
      this.notifyListeners(null)
    } catch (error) {
      console.error('❌ Error cerrando sesión:', error)
    }
  }

  // Suscribirse a cambios de sesión
  subscribe(listener: (session: SessionData | null) => void): () => void {
    this.listeners.push(listener)
    
    // Devolver función para desuscribirse
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  // Notificar a todos los listeners
  private notifyListeners(session: SessionData | null): void {
    this.listeners.forEach(listener => {
      try {
        listener(session)
      } catch (error) {
        console.error('❌ Error notificando listener:', error)
      }
    })
  }

  // Verificar sesión periódicamente
  startPeriodicCheck(): void {
    if (typeof window === 'undefined') return
    
    setInterval(() => {
      const sessionData = this.getSessionData()
      if (sessionData) {
        console.log('🔄 Verificación periódica de sesión:', sessionData.username)
        this.notifyListeners(sessionData)
      } else {
        console.log('❌ Sesión no encontrada en verificación periódica')
        this.notifyListeners(null)
      }
    }, 30000) // Cada 30 segundos
  }
}

// Exportar instancia singleton
export const sessionManager = SessionManager.getInstance()

// Iniciar verificación periódica
if (typeof window !== 'undefined') {
  sessionManager.startPeriodicCheck()
}
