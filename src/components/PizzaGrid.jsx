import React from 'react'

import napolitana from '../img/napolitana.jpg'
import pepperoni from '../img/peperoni.jpg'
import espoñola from '../img/española.jpeg'


const formatearCLP = (monto) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(monto)

const PIZZAS = [
  {
    id: 1,
    nombre: 'Pizza Napolitana',
    precio: 5950,
    img: napolitana,
    desc: 'Mozzarella, tomates, jamón, orégano'
  },
  {
    id: 2,
    nombre: 'Pizza Española',
    precio: 6950,
    img: espoñola,
    desc: 'Mozzarella, gorgonzola, parmesano, provolone'
  },
  {
    id: 3,
    nombre: 'Pizza Pepperoni',
    precio: 6950,
    img: pepperoni,
    desc: 'Mozzarella, peperoni, orégano'
  }
]

export default function PizzaGrid({ onAdd }) {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {PIZZAS.map(p => (
            <div className="col" key={p.id}>
              <div className="card h-100 shadow-sm border-0">
                <img src={p.img} className="card-img-top" alt={p.nombre} loading="lazy" />
                <div className="card-body d-flex flex-column text-center">
                  <h5 className="card-title fw-bold mb-2">{p.nombre}</h5>
                  <p className="card-text text-muted small mb-3">🍕 {p.desc}</p>
                  <h4 className="text-danger fw-bold mb-4">{formatearCLP(p.precio)}</h4>
                  <div className="mt-auto d-flex justify-content-center gap-2">
                    <button className="btn btn-outline-secondary btn-sm">
                      <i className="fa-solid fa-eye me-1"></i> Ver Detalle
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => onAdd?.(p.precio)}>
                      <i className="fa-solid fa-cart-plus me-1"></i> Agregar
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
