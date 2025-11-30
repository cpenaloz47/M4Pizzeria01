
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import TopNavbar from './components/TopNavbar'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CartPage from './pages/CartPage'
import PizzaPage from './pages/PizzaPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'

import { useCart } from './context/CartContext'

function AppInner() {
  const [pizzasApi, setPizzasApi] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const { clearCart } = useCart()

  useEffect(() => {
    async function cargar() {
    try {
          setLoading(true)
          setError('')
          const res = await fetch('/api/pizzas')
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
        }
      catch (err) {
        console.error(err)
        setError('No se pudieron cargar las pizzas')
      } finally {
        setLoading(false)
      }
    }
    cargar()
  }, [])

  const handleReset = () => {
    clearCart()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <TopNavbar onReset={handleReset} />

        <main className="flex-fill">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  pizzas={pizzasApi}
                  loading={loading}
                  error={error}
                />
              }
            />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/carrito" element={<CartPage />} />
            <Route path="/pizza/:id" element={<PizzaPage pizzas={pizzasApi} />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default function App() {
  return <AppInner />
}
