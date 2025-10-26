import React from 'react'


export default function TopNavbar({ total }) {
  const token = false;
  const formatearCLP = (monto) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(monto)

  return (
    <nav className="full-bleed navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container py-2">
        <div className="d-flex align-items-center gap-2">
          <span className="navbar-brand mb-0 h1">Pizzeria Mamma Mia!</span>

          <div className="d-none d-md-flex align-items-center gap-2">
            <button className="btn btn-outline-light btn-sm">
              <i className="fa-solid fa-house me-1"></i> Home
            </button>
            <button className="btn btn-outline-light btn-sm">
              <i className="fa-solid fa-lock me-1"></i> Login
            </button>
            <button className="btn btn-outline-light btn-sm">
              <i className="fa-solid fa-key me-1"></i> Registrar
            </button>
          </div>
        </div>

        <div className="d-flex align-items-center ms-auto">
          <div className="border rounded-3 px-3 py-2 bg-light text-dark d-flex align-items-center">
            <i className="fa-solid fa-cart-shopping me-2"></i>
            <strong>Total:</strong>
            <span className="ms-2">{formatearCLP(total)}</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
