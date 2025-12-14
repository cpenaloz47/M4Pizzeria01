import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useUser } from '../context/UserContext'

const formatearCLP = (monto) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(monto)

export default function CartPage() {
  const { items, total, increase, decrease, clearCart, checkout } = useCart()

  const { token } = useUser()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const hayItems = items.length > 0

  const handlePagar = async () => {
    if (!hayItems || loading) return

    try {
      setError('')
      setLoading(true)

      await checkout(token)     
      clearCart()          
      setSuccess(true)     
    } catch (e) {
      setError(e.message || 'Error al pagar')
    } finally {
      setLoading(false)
    }
  }


  if (success) {
    return (
      <div className="container py-5 text-center">
        <div className="card shadow-sm border-0 rounded-4 p-4 mx-auto" style={{ maxWidth: 520 }}>
          <h3 className="fw-bold mb-2 text-success">
            <i className="fa-solid fa-circle-check me-2"></i>
            ¡Pago realizado con éxito!
          </h3>

          <p className="text-muted mb-4">
            Tu pedido fue enviado correctamente.
          </p>

          <Link to="/" className="btn btn-primary px-4">
            <i className="fa-solid fa-house me-2"></i>
            Volver al Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">
        <i className="fa-solid fa-cart-shopping me-2" />
        Carrito de compra
      </h2>

      {!hayItems && (
        <p className="text-muted">No existen productos seleccionados</p>
      )}

      {error && (
        <div className="alert alert-danger py-2 mb-3">
          {error}
        </div>
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
                    <td className="text-center">{formatearCLP(item.precio)}</td>
                    <td className="text-center">
                      <div className="btn-group btn-group-sm" role="group">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => decrease(item.id)}
                          disabled={loading}
                        >
                          -
                        </button>
                        <span className="btn btn-light disabled">
                          {item.cantidad}
                        </span>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => increase(item.id)}
                          disabled={loading}
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
              className="btn btn-success px-4"
              onClick={handlePagar}
              disabled={!hayItems || loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Procesando...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-credit-card me-2" />
                  Pagar
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
