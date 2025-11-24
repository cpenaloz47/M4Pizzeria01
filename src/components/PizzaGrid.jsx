import React from 'react'
import { Link } from 'react-router-dom'

const formatearCLP = (monto) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(monto)

export default function PizzaGrid({ pizzas = [], onAdd }) {
  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-end mb-3">
          <h2 className="mb-0">Nuestras Pizzas</h2>
          <span className="text-muted">Hechas al momento 🍕</span>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {pizzas.map((p) => (
            <div className="col" key={p.id}>
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={p.img}
                  className="card-img-top"
                  alt={p.nombre}
                  loading="lazy"
                />
                <div className="card-body d-flex flex-column text-center">
                  <h5 className="card-title fw-bold mb-2">{p.nombre}</h5>
                  <p className="card-text text-muted small mb-3">🍕 {p.desc}</p>
                   <h4 className="text-danger fw-bold mb-4">
                    {formatearCLP(p.precio)}
                  </h4>

                  <div className="mt-auto d-flex justify-content-center gap-2">
                    <Link
                      to={`/pizza/${p.id}`}
                      className="btn btn-outline-secondary btn-sm"
                    >
                      <i className="fa-solid fa-eye me-1" />
                      Ver Detalle
                    </Link>

                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => onAdd?.(p)}
                    >
                      <i className="fa-solid fa-cart-plus me-1" />
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
