
import React, { useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import TopNavbar from './components/TopNavbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import PizzaGrid from './components/PizzaGrid' //Este es mi pagna HOME
import RegisterModal from './components/RegisterModal'
import LoginModal from './components/LoginModal'
import PizzaDetailModal from './components/PizzaDetailModal'
import CartModal from './components/CartModal' //CARRITO DE COMPRA

export default function App() {
 
  const [cartItems, setCartItems] = useState([])

  //pizza seleccionada para Visualizacion
  const [selectedPizza, setSelectedPizza] = useState(null)
  const handleViewDetail = (pizza) => setSelectedPizza(pizza)

  //Detalle del Carrito de Compra
  const total = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
    [cartItems]
  )

  const handleAddToCart = (pizza) => {
    setCartItems((prev) => {
      const existe = prev.find((item) => item.id === pizza.id)
      if (existe) {
        return prev.map((item) =>
          item.id === pizza.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }
      return [...prev, { ...pizza, cantidad: 1 }]
    })
  }

  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    )
  }

  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    )
  }

  // Reinicia el Home
  const handleReset = () => {
    setCartItems([])
    setSelectedPizza(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  //Detalle de Productos
  const [PIZZAS, setPizzasApi] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
      const controller = new AbortController()

      async function cargar() {
        try {
          setLoading(true)
          setError('')
          const res = await fetch('/api/pizzas', { signal: controller.signal })
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          const data = await res.json()
          const normalizadas = data.map(p => ({
            id: p.id ?? p._id ?? p.codigo,
            nombre: p.nombre ?? p.name ?? 'Pizza',
            desc: p.desc ?? p.desc ?? '...',
            precio: Number(p.precio ?? p.price ?? 0),
            img: p.img?.startsWith('http') ? p.img : (p.imagen?.startsWith('http') ? p.imagen : (p.imagen || p.img || '/img/placeholder.jpg')),
            ingredientes: p.ingredientes ?? p.ingredients ?? [],
          }))

          setPizzasApi(normalizadas)
        } catch (err) {
          if (err.name !== 'AbortError') {
            console.error(err)
            setError('No se pudieron cargar las pizzas. Revisa la API.')
          }
        } finally {
          setLoading(false)
        }
      }

      cargar()
      return () => controller.abort()
    }, [])
  
  return (
    <div className="d-flex flex-column min-vh-100">
      <TopNavbar total={total} onReset={handleReset} />

      <Hero titulo="¡Pizzeria Mamma Mia!" />

      <main className="flex-fill">
        <PizzaGrid pizzas={PIZZAS} onAdd={handleAddToCart} onViewDetail={handleViewDetail} />
      </main>

      <Footer />
       <LoginModal />
       <RegisterModal />
       <PizzaDetailModal  pizza={selectedPizza} onAdd={handleAddToCart}  onClose={() => setSelectedPizza(null)}  />
       <CartModal  items={cartItems} total={total} onIncrease={handleIncrease} onDecrease={handleDecrease} />
    </div>
  )
} 