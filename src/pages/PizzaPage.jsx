// src/pages/PizzaPage.jsx
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const formatearCLP = (monto) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(monto)

export default function PizzaPage() {
  const { id } = useParams()
  const { addItem } = useCart()

  const [pizza, setPizza] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function cargarPizza() {
      try {
        setLoading(true)
        setError('')

        const res = await fetch(`/api/pizzas/${id}`)
        if (!res.ok) throw new Error('Error al cargar la pizza')
        const data = await res.json()
        setPizza(data)
        console.log(data)
      } catch (err) {
        console.error(err)
        setError('No se pudo cargar la pizza solicitada')
      } finally {
        setLoading(false)
      }
    }

    cargarPizza()
  }, [id])

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-danger" role="status" />
        <p className="mt-3">Cargando pizza...</p>
      </div>
    )
  }

  if (error || !pizza) {
    return (
      <div className="container text-center py-5">
        <h3>No se pudo cargar la pizza</h3>
        <p className="text-muted mb-4">{error}</p>
        <Link to="/" className="btn btn-primary">
          <i className="fa-solid fa-house me-2" />
          Volver al Home
        </Link>
      </div>
    )
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center g-4">
        <div className="col-12 col-lg-10">
          <div className="row g-4 align-items-center">
            {/* Imagen */}
            <div className="col-12 col-md-6">
              <img
                src={pizza.img}
                alt={pizza.name}
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: '380px', objectFit: 'cover', width: '100%' }}
              />
            </div>

            {/* Detalle */}
            <div className="col-12 col-md-6">
              <h2 className="fw-bold mb-3">{pizza.name}</h2>

              <h5 className="text-danger fw-bold mb-3">
                {formatearCLP(pizza.price)}
              </h5>

              <h6 className="fw-semibold mb-2">Ingredientes:</h6>
              <ul className="list-unstyled small mb-4">
                {pizza.ingredients?.map((ing, i) => (
                  <li key={i}>🍕 {ing}</li>
                ))}
              </ul>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => addItem(pizza)}
                >
                  <i className="fa-solid fa-cart-plus me-1" />
                  Agregar al carrito
                </button>

                <Link to="/" className="btn btn-outline-secondary">
                  Volver al Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
