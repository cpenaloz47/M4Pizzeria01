import React from 'react'

const formatearCLP = (monto) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(monto)

export default function CartModal({ items, total, onIncrease, onDecrease }) {
  const handlePagar = () => {
    if (!items.length) return
    alert('Proceso de pago aún no implementado 🙂')
  }

  const hayItems = items.length > 0

  return (
    <div
      className="modal fade"
      id="cartModal"
      tabIndex="-1"
      aria-labelledby="cartModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 rounded-4 shadow-lg">
          <div className="modal-header bg-dark text-white rounded-top-4 py-2">
            <h5 className="modal-title fw-semibold" id="cartModalLabel">
              <i className="fa-solid fa-cart-shopping me-2"></i> Carrito de compra
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body px-4 py-3">
            {!hayItems && (
              <p className="text-center text-muted mb-0">
                No existen productos seleccionados
              </p>
            )}

            {hayItems && (
              <>
                <div className="table-responsive mb-3">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th className="text-start">Producto</th>
                        <th className="text-center">Precio</th>
                        <th className="text-center">Cantidad</th>
                        <th className="text-end">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td className="text-start">
                            <strong>{item.nombre}</strong>
                          </td>
                          <td className="text-center">
                            {formatearCLP(item.precio)}
                          </td>
                          <td className="text-center">
                            <div className="btn-group btn-group-sm" role="group">
                              <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => onDecrease?.(item.id)}
                              >
                                -
                              </button>
                              <span className="btn btn-light disabled">
                                {item.cantidad}
                              </span>
                              <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => onIncrease?.(item.id)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="text-end">
                            {formatearCLP(item.precio * item.cantidad)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    Total: <span className="text-danger">{formatearCLP(total)}</span>
                  </h5>
                  <button
                    className="btn btn-success"
                    onClick={handlePagar}
                    disabled={!hayItems}
                  >
                    <i className="fa-solid fa-credit-card me-1"></i> Pagar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
