import React from 'react'
import { Link } from 'react-router-dom'


export default function TopNavbar({ total, onReset  }) {
  const token = false;
  const formatearCLP = (monto) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(monto)

  return (
    <nav className="full-bleed navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container py-2">
        <div className="d-flex align-items-center gap-2">
          
          {/*<span className="navbar-brand mb-0 h1">Pizzeria Mamma Mia!</span>*/}
          <Link to="/" className="navbar-brand mb-0 h1" onClick={onReset}>Pizzeria Mamma Mia!</Link>

          <div className="d-none d-md-flex align-items-center gap-2">
            <Link to="/" className="btn btn-outline-light btn-sm" onClick={onReset}>
              <i className="fa-solid fa-house me-1"></i> Home
            </Link>

            <Link to="/login" className="btn btn-outline-light btn-sm">
              <i className="fa-solid fa-lock me-1"></i> Login
            </Link>

            <Link to="/register" className="btn btn-outline-light btn-sm">
              <i className="fa-solid fa-key me-1"></i> Registrar
            </Link>

            {/*
            <button className="btn btn-outline-light btn-sm" onClick={onReset}>
              <i className="fa-solid fa-house me-1"></i> Home
            </button>
            <button className="btn btn-outline-light btn-sm" data-bs-toggle="modal"  data-bs-target="#loginModal">
              <i className="fa-solid fa-lock me-1"></i> Login
            </button>
            <button className="btn btn-outline-light btn-sm" data-bs-toggle="modal"  data-bs-target="#registerModal">
              <i className="fa-solid fa-key me-1"></i> Registrar
            </button>
            */}
          </div>
        </div>

        {/* CARRITO: clic abre modal */}
        <div className="d-flex align-items-center gap-2">
            <Link to="/carrito" className="btn btn-light btn-sm text-dark fw-bold d-flex align-items-center">
               <i className="fa-solid fa-cart-shopping me-2"></i>{formatearCLP(total)}
            </Link>
            <Link to="/profile" className="btn btn-outline-light btn-sm">
               <i className="fa-solid fa-user me-1"></i> Cerrar Sesion
            </Link>

          {/*  <button
            type="button"
            className="border rounded-3 px-3 py-2 bg-light text-dark d-flex align-items-center btn btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#cartModal"  >
            <i className="fa-solid fa-cart-shopping me-2"></i>
            <strong>Total:</strong>
            <span className="ms-2">{formatearCLP(total)}</span>
          </button>*/}
        </div>
      </div>
    </nav>
  )
}
