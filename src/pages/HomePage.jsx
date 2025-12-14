import React from 'react'
import Hero from '../components/Hero'
import PizzaGrid from '../components/PizzaGrid'
import { useUser } from '../context/UserContext'

export default function HomePage({ pizzas, loading, error }) {

  const { email } = useUser()

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-danger" role="status" />
        <p className="mt-3 text-muted">Cargando pizzas...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    )
  }

  return (
    <div className="flex-fill">
      <Hero titulo="Pizzería Mamma Mia!" />
      <PizzaGrid pizzas={pizzas} />
    </div>
  )
}
