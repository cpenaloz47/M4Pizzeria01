import React, { useEffect, useRef } from 'react'
import { Modal } from 'bootstrap'

const formatearCLP = (monto) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(monto)

export default function PizzaDetailModal({ pizza, onAdd, onClose }) {
  const modalRef = useRef(null)

  useEffect(() => {
    const modalEl = modalRef.current
    if (!modalEl) return

    const bsModal = Modal.getOrCreateInstance(modalEl)

    if (pizza) {
      bsModal.show()
    } else {
      bsModal.hide()
    }

    const handleHidden = () => {
      onClose?.()
    }

    modalEl.addEventListener('hidden.bs.modal', handleHidden)

    return () => {
      modalEl.removeEventListener('hidden.bs.modal', handleHidden)
    }
  }, [pizza, onClose])

  if (!pizza) return null

  return (
    <div
      className="modal fade"
      id="pizzaDetailModal"
      tabIndex="-1"
      aria-labelledby="pizzaDetailLabel"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 rounded-4 shadow-lg">
          <div className="modal-header bg-dark text-white rounded-top-4 py-2">
            <h5 className="modal-title fw-semibold" id="pizzaDetailLabel">
              <i className="fa-solid fa-pizza-slice me-2"></i> {pizza.nombre}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body text-center px-4 pb-4 pt-3">
            <img
              src={pizza.img}
              alt={pizza.nombre}
              className="img-fluid rounded mb-3"
              style={{ maxHeight: '250px', objectFit: 'cover' }}
            />

            <h6 className="fw-bold text-danger mb-3">
              Precio: {formatearCLP(pizza.precio)}
            </h6>

            <ul className="list-unstyled small text-start mb-4">
              {pizza.ingredientes.map((ing, i) => (
                <li key={i}>🍕 {ing}</li>
              ))}
            </ul>

            <button
              className="btn btn-primary btn-sm px-4"
              onClick={() => onAdd?.(pizza)}
              data-bs-dismiss="modal"
            >
              <i className="fa-solid fa-cart-plus me-1"></i> Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
