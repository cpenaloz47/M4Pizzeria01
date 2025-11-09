import React from 'react'


const formatearCLP = (monto) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(monto)


export default function PizzaGrid({ pizzas = [], onAdd, onViewDetail  }) {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {pizzas.map(p => (
            <div className="col" key={p.id}>
              <div className="card h-100 shadow-sm border-0">
                <img src={p.img} className="card-img-top" alt={p.nombre} loading="lazy" />
                <div className="card-body d-flex flex-column text-center">
                  <h5 className="card-title fw-bold mb-2">{p.nombre}</h5>
                  <p className="card-text text-muted small mb-3">🍕 {p.desc}</p>
                  <ul className="list-unstyled small text-muted mb-3 text-start">
                    {p.ingredientes?.map((ing, idx) => (
                      <li key={idx}>• {ing}</li>
                    ))}
                  </ul>
                  <h4 className="text-danger fw-bold mb-4">{formatearCLP(p.precio)}</h4>
                  <div className="mt-auto d-flex justify-content-center gap-2">
                    <button className="btn btn-outline-secondary btn-sm"
                            onClick={() => onViewDetail(p)} >
                      <i className="fa-solid fa-eye me-1"></i> Ver Detalle
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => onAdd?.(p)}>
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
