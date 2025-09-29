// Utilidades de autenticación para administrador

export const isAdminLoggedIn = (): boolean => {
  if (typeof window === 'undefined') return false
  
  try {
    const isLoggedIn = localStorage.getItem('adminLoggedIn')
    const adminUser = localStorage.getItem('adminUser')
    const loginTime = localStorage.getItem('adminLoginTime')
    
    // Verificar que todos los datos de sesión existan
    const hasValidSession = isLoggedIn === 'true' && 
                           adminUser !== null && 
                           adminUser.trim() !== '' &&
                           loginTime !== null
    
    if (hasValidSession) {
      console.log('🔐 Sesión válida encontrada:', { adminUser, loginTime })
      return true
    } else {
      console.log('❌ Sesión inválida o expirada')
      return false
    }
  } catch (error) {
    console.error('❌ Error verificando sesión:', error)
    return false
  }
}

export const getAdminUser = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('adminUser')
}

export const loginAdmin = (username: string): void => {
  if (typeof window === 'undefined') return
  
  // Guardar datos de sesión
  localStorage.setItem('adminLoggedIn', 'true')
  localStorage.setItem('adminUser', username)
  localStorage.setItem('adminLoginTime', new Date().toISOString())
  
  console.log('✅ Admin logueado:', username)
  console.log('🔐 Sesión guardada en localStorage')
}

export const logoutAdmin = (): void => {
  if (typeof window === 'undefined') return
  
  const adminUser = getAdminUser()
  console.log('👋 Cerrando sesión de admin:', adminUser)
  
  // Limpiar todos los datos de sesión
  localStorage.removeItem('adminLoggedIn')
  localStorage.removeItem('adminUser')
  localStorage.removeItem('adminLoginTime')
  
  console.log('✅ Sesión cerrada correctamente')
}


