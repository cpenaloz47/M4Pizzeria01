import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useUser } from '../context/UserContext'

export default function TopNavbar({ onReset }) {
  const { total, clearCart } = useCart()
  const { isAuthenticated, email, logout } = useUser()
  const navigate = useNavigate()

  const formatearCLP = (monto) =>
    new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(monto)

  const handleLogoutClick = () => {
    clearCart()
    logout()
    navigate('/login')
  }

  return (
    <nav className="full-bleed navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container py-2 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          {/* Marca */}
          {isAuthenticated ? (
            <Link to="/" className="navbar-brand mb-0 h1" onClick={onReset}>
              Pizzería Mamma Mia!
            </Link>
          ) : (
            <span className="navbar-brand mb-0 h1">
              Pizzería Mamma Mia!
            </span>
          )}
        </div>

        <div className="d-flex align-items-center gap-2">

          {!isAuthenticated && (
            <>
              <Link to="/login" className="btn btn-outline-light btn-sm">
                <i className="fa-solid fa-lock me-1" /> Login
              </Link>
              <Link to="/register" className="btn btn-outline-light btn-sm">
                <i className="fa-solid fa-key me-1" /> Registrar
              </Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <span className="text-light small ms-3 d-flex align-items-center">
              <i className="fa-solid fa-user me-1"></i>
                {email}
              </span>
              <Link
                to="/"
                className="btn btn-outline-light btn-sm"
                onClick={onReset}
              >
                <i className="fa-solid fa-house me-1" /> Home
              </Link>

              <button
                className="btn btn-outline-light btn-sm"
                onClick={handleLogoutClick}
              >
                <i className="fa-solid fa-right-from-bracket me-1" /> Cerrar sesión
              </button>

              <Link
                to="/carrito"
                className="border rounded-3 px-3 py-2 bg-light text-dark d-flex align-items-center btn btn-sm"
              >
                <i className="fa-solid fa-cart-shopping me-2" />
                <strong>Total:</strong>
                <span className="ms-2">{formatearCLP(total)}</span>
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  )
}
