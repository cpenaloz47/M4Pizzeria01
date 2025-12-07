import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const login = (email, password) => {
    // Emulación de credenciales válidas
    if (email === 'cpenaloz@gmail.com' && password === '123456') {
      setIsAuthenticated(true)
      setUser({ email })
      return { ok: true }
    }
    return { ok: false, message: 'Credenciales incorrectas' }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  }
  return ctx
}
