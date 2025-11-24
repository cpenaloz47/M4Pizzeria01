import React, { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'

const formatearCLP = (monto) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(monto)

export default function PizzaPage({ pizzas = [], onAdd }) {
  const { id } = useParams()

  const pizza = useMemo(
    () => pizzas.find((p) => String(p.id) === String(id)),
    [pizzas, id]
  )

  if (!pizza) {
    return (
      <div className="container my-5 text-center">
        <h3 className="mb-3">Pizza no encontrada</h3>
        <p className="text-muted mb-4">
          La pizza que buscas no existe o ya no está disponible.
        </p>
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
                alt={pizza.nombre}
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: '380px', objectFit: 'cover', width: '100%' }}
              />
            </div>

            {/* Detalle */}
            <div className="col-12 col-md-6">
              <h2 className="fw-bold mb-3">{pizza.nombre}</h2>

              <h5 className="text-danger fw-bold mb-3">
                {formatearCLP(pizza.precio)}
              </h5>

              <h6 className="fw-semibold mb-2">Ingredientes:</h6>
              <ul className="list-unstyled small mb-4">
                {pizza.ingredientes?.map((ing, i) => (
                  <li key={i}>🍕 {ing}</li>
                ))}
              </ul>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => onAdd?.(pizza)}
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
