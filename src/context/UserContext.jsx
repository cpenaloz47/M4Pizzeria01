import React, {
  createContext,
  useContext,
  useState,
  useMemo,
} from 'react'
import { useCart } from './CartContext'

/* ======================================================
   CONTEXT
====================================================== */
const UserContext = createContext(null)

/* ======================================================
   PROVIDER
====================================================== */
export function UserProvider({ children }) {
  // 🔴 HOOKS SOLO AQUÍ (NUNCA AFUERA)
  const { clearCart } = useCart()

  const [token, setToken] = useState(null)
  const [email, setEmail] = useState(null)
  const [loadingProfile, setLoadingProfile] = useState(false)

  // Estado derivado
  const isAuthenticated = useMemo(() => Boolean(token), [token])

  /* ======================================================
     LOGIN
  ====================================================== */
  const login = async (emailInput, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailInput,
          password,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        return {
          ok: false,
          message: err.message || 'Credenciales inválidas',
        }
      }

      const data = await res.json()

      // 🔑 Guardamos JWT y email
      setToken(data.token)
      setEmail(data.email)

      return { ok: true }
    } catch (error) {
      console.error('LOGIN ERROR:', error)
      return {
        ok: false,
        message: 'Error de conexión con el servidor',
      }
    }
  }

  /* ======================================================
     REGISTER
  ====================================================== */
  const register = async (emailInput, password) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailInput,
          password,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        return {
          ok: false,
          message: err.message || 'No se pudo registrar',
        }
      }

      const data = await res.json()

      // 🔑 Guardamos JWT y email
      setToken(data.token)
      setEmail(data.email)

      return { ok: true }
    } catch (error) {
      console.error('REGISTER ERROR:', error)
      return {
        ok: false,
        message: 'Error de conexión con el servidor',
      }
    }
  }

  /* ======================================================
     GET PROFILE (/me)
  ====================================================== */
  const getProfile = async () => {
    if (!token) {
      return { ok: false, message: 'No hay token' }
    }

    try {
      setLoadingProfile(true)

      const res = await fetch('/api/auth/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.status === 401) {
        logout()
        return { ok: false, message: 'Sesión expirada' }
      }

      if (!res.ok) {
        return {
          ok: false,
          message: 'No se pudo obtener el perfil',
        }
      }

      const data = await res.json()

      // 🔴 CLAVE: actualizar estado
      setEmail(data.email)

      return { ok: true, profile: data }
    } catch (error) {
      console.error('GET PROFILE ERROR:', error)
      return {
        ok: false,
        message: 'Error de conexión',
      }
    } finally {
      setLoadingProfile(false)
    }
  }

  /* ======================================================
     LOGOUT
  ====================================================== */
  const logout = () => {
    setToken(null)
    setEmail(null)
    clearCart()
  }

  /* ======================================================
     VALUE
  ====================================================== */
  const value = {
    token,
    email,
    isAuthenticated,
    loadingProfile,
    login,
    register,
    getProfile,
    logout,
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

/* ======================================================
   HOOK
====================================================== */
export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) {
    throw new Error(
      'useUser debe usarse dentro de <UserProvider>'
    )
  }
  return ctx
}
