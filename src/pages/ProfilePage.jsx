import React from 'react'
import { useNavigate } from 'react-router-dom'
import Profile from '../components/Profile'

export default function ProfilePage({ onLogout }) {
  const navigate = useNavigate()

  const handleLogoutClick = () => {
    onLogout()
    navigate('/')
  }

  return (
    <Profile
      email="usuario@ejemplo.com"
      onLogout={handleLogoutClick}
    />
  )
}
