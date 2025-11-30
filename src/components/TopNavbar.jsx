import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function TopNavbar({ onReset }) {
  const { total } = useCart()

  const formatearCLP = (monto) =>
    new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(monto)

  return (
    <nav className="full-bleed navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container py-2">
        <div className="d-flex align-items-center gap-2">
          <Link to="/" className="navbar-brand mb-0 h1" onClick={onReset}>
            Pizzería Mamma Mia!
          </Link>

          <div className="d-none d-md-flex align-items-center gap-2">
            <Link to="/" className="btn btn-outline-light btn-sm" onClick={onReset}>
              <i className="fa-solid fa-house me-1" /> Home
            </Link>
            <Link to="/login" className="btn btn-outline-light btn-sm">
              <i className="fa-solid fa-lock me-1" /> Login
            </Link>
            <Link to="/register" className="btn btn-outline-light btn-sm">
              <i className="fa-solid fa-key me-1" /> Registrar
            </Link>
          </div>
        </div>

        <div className="d-flex align-items-center ms-auto gap-2">
          <Link
            to="/carrito" className="border rounded-3 px-3 py-2 bg-light text-dark d-flex align-items-center btn btn-sm" >
            <i className="fa-solid fa-cart-shopping me-2" />
            <strong>Total:</strong>
            <span className="ms-2">{formatearCLP(total)}</span>
          </Link>
          <Link to="/profile" className="btn btn-outline-light btn-sm">
               <i className="fa-solid fa-user me-1"></i> Cerrar Sesion
          </Link>

        </div>
      </div>
    </nav>
  )
}
