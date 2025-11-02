
import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import TopNavbar from './components/TopNavbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import PizzaGrid from './components/PizzaGrid'
import RegisterModal from './components/RegisterModal'
import LoginModal from './components/LoginModal'

export default function App() {
  const [total, setTotal] = useState(0)

  const handleAddToCart = (precio) => setTotal(t => t + precio)

  return (
    <div className="d-flex flex-column min-vh-100">
      <TopNavbar total={total} />

      <Hero titulo="¡Pizzeria Mamma Mia!" />

      <main className="flex-fill">
        <PizzaGrid onAdd={handleAddToCart} />
      </main>

      <Footer />
       <LoginModal />
      <RegisterModal />
    </div>
  )
}