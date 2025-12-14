
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom'

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
import { useUser } from './context/UserContext'

function AppInner() {
  const [pizzasApi, setPizzasApi] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const { clearCart } = useCart()
  const { isAuthenticated } = useUser()

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
            {/* Home protegido: solo si está autenticado */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <HomePage
                    pizzas={pizzasApi}
                    loading={loading}
                    error={error}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Login y Register siempre accesibles */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Estas Rutas requieren login */}
            <Route path="/carrito"
                   element={ isAuthenticated ? <CartPage /> : <Navigate to="/login" replace />  } />

            <Route
              path="/pizza/:id"
              element={ isAuthenticated ? (
                        <PizzaPage />
                        ) : (
                        <Navigate to="/login" replace />
                        )
                     } />

            <Route
              path="/profile"
              element={
                isAuthenticated ? (
                  <ProfilePage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* 404 */}
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
