
import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import TopNavbar from './components/TopNavbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import PizzaGrid from './components/PizzaGrid'

export default function App() {
  const [total, setTotal] = useState(0)

  const handleAddToCart = (precio) => setTotal(t => t + precio)

  return (
    <div className="d-flex flex-column min-vh-100">
      <TopNavbar total={total} />

      {/* HERO full-bleed debajo del navbar */}
      <Hero titulo="¡Pizzeria Mamma Mia!" />

      {/* Cards de pizzas y precios (entre hero y footer) */}
      <main className="flex-fill">
        <PizzaGrid onAdd={handleAddToCart} />
      </main>

      <Footer />
    </div>
  )
}