import React from 'react'
import Hero from '../components/Hero'
import PizzaGrid from '../components/PizzaGrid'

export default function HomePage({ pizzas, onAdd, onViewDetail }) {
  return (
    <div className="flex-fill">
      <Hero titulo="Pizzeria Mamma Mia!" />
      <PizzaGrid
        pizzas={pizzas}
        onAdd={onAdd}
        onViewDetail={onViewDetail}
      />
    </div>
  )
}
