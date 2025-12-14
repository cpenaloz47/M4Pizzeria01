import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Profile from '../components/Profile'
import { useUser } from '../context/UserContext'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { email, getProfile, logout, loadingProfile } = useUser()
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProfile() {
      const result = await getProfile()
      if (!result.ok) {
        setError(result.message || 'No se pudo cargar el perfil')
      }
    }
    loadProfile()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (loadingProfile) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" />
        <p className="mt-3">Cargando perfil...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <p className="text-danger">{error}</p>
      </div>
    )
  }

  return (
    <Profile
      email={email}
      onLogout={handleLogout}
    />
  )
}
