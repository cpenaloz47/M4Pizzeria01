import React from 'react'
import { useCart } from '../context/CartContext'

const formatearCLP = (monto) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(monto)

export default function CartPage() {
  const { items, total, increase, decrease } = useCart()
  const hayItems = items.length > 0

  const handlePagar = () => {
    if (!items.length) return
    alert('Proceso de pago aún no implementado 🙂')
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">
        <i className="fa-solid fa-cart-shopping me-2"></i> Carrito de compra
      </h2>

      {!hayItems && (
        <p className="text-muted">No existen productos seleccionados</p>
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
                          onClick={() => decrease?.(item.id)}
                        >
                          -
                        </button>
                        <span className="btn btn-light disabled">
                          {item.cantidad}
                        </span>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => increase?.(item.id)}
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
              Total:{' '}
              <span className="text-danger">{formatearCLP(total)}</span>
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
  )
}
