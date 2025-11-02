import React, { useState, useEffect, useRef } from 'react'

export default function LoginModal() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const modalRef = useRef(null)

  useEffect(() => {
    const modalEl = modalRef.current
    if (!modalEl) return

    const resetForm = () => {
      setEmail('')
      setPassword('')
      setError('')
      setSuccess(false)
    }

    modalEl.addEventListener('shown.bs.modal', resetForm)
    modalEl.addEventListener('hidden.bs.modal', resetForm)
    return () => {
      modalEl.removeEventListener('shown.bs.modal', resetForm)
      modalEl.removeEventListener('hidden.bs.modal', resetForm)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!email || !password) {
      setError('Debe completar todos los campos')
      return
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    console.log('Inicio de sesión:', { email, password })
    setSuccess(true)
  }

  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex="-1"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div
          className="modal-content shadow-lg border-0 rounded-4"
          style={{ maxWidth: '420px', margin: 'auto' }}
        >
          {/* Encabezado */}
          <div className="modal-header bg-dark text-white rounded-top-4 py-2">
            <h5 className="modal-title fw-semibold" id="loginModalLabel">
              <i className="fa-solid fa-lock me-2"></i> Login Sesión
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
            ></button>
          </div>

          {/* Cuerpo */}
          <div className="modal-body px-4 py-3">
            {error && (
              <div className="alert alert-danger py-2 small mb-3 text-start">
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success py-2 small mb-3 text-start">
                Inicio de sesión exitoso 🎉
              </div>
            )}

            <form onSubmit={handleSubmit} className="text-start">
              <div className="mb-3">
                <label className="form-label fw-semibold small">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold small">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control form-control-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  required
                />
              </div>

              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary btn-sm px-4">
                  Ingresar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
