// src/pages/ProfilePage.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Profile from '../components/Profile'
import { useCart } from '../context/CartContext'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { clearCart } = useCart()

  const handleLogoutClick = () => {
    clearCart()
    navigate('/')
  }

  return (
    <Profile
      email="usuario@ejemplo.com"
      onLogout={handleLogoutClick}
    />
  )
}
