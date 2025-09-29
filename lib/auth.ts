// Utilidades de autenticación para administrador

export const isAdminLoggedIn = (): boolean => {
  if (typeof window === 'undefined') return false
  
  const isLoggedIn = localStorage.getItem('adminLoggedIn')
  const adminUser = localStorage.getItem('adminUser')
  
  // La sesión persiste hasta que se cierre manualmente
  // Solo verificar que ambos valores existan
  return isLoggedIn === 'true' && adminUser !== null
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


