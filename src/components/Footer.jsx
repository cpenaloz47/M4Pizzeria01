import React from 'react'

export default function Footer() {
  return (
    <footer className="full-bleed bg-dark text-white py-3 mt-auto">
      <div className="container text-center">
        <small>© {new Date().getFullYear()} Pizzeria Mamma Mia! — Todos los derechos reservados</small>
      </div>
    </footer>
  )
}
