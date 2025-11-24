import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="container text-center py-5">
      <h1 className="display-4 fw-bold text-danger mb-3">404</h1>
      <p className="lead mb-4">La página que buscas no existe 😢</p>

      <Link to="/" className="btn btn-primary btn-lg">
        <i className="fa-solid fa-house me-2"></i>
        Ir al Home
      </Link>
    </div>
  )
}
