import React, { useState, useEffect, useRef } from 'react'

export default function RegisterModal() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const modalRef = useRef(null)

  useEffect(() => {
    const modalEl = modalRef.current
    if (!modalEl) return

    const handleOpen = () => {
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setError('')
      setSuccess(false)
    }

    modalEl.addEventListener('shown.bs.modal', handleOpen)
    return () => modalEl.removeEventListener('shown.bs.modal', handleOpen)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!email || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios')
      return
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    console.log('Usuario registrado:', { email, password })
    setSuccess(true)
  }

  return (
    <div
      className="modal fade"
      id="registerModal"
      tabIndex="-1"
      aria-labelledby="registerModalLabel"
      aria-hidden="true"
      ref={modalRef}  
    >
      <div className="modal-dialog modal-dialog-centered">
        <div
          className="modal-content shadow-lg border-0 rounded-4"
          style={{ maxWidth: '420px', margin: 'auto' }}  >
          <div className="modal-header bg-dark text-white rounded-top-4 py-2">
            <h5 className="modal-title fw-semibold" id="registerModalLabel">
              <i className="fa-solid fa-key me-1"></i> Registrar Cuenta
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body px-4 py-3">
            {error && (
              <div className="alert alert-danger py-2 small mb-3 text-start">
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success py-2 small mb-3 text-start">
                Registro exitoso 🎉
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

              <div className="mb-3">
                <label className="form-label fw-semibold small">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control form-control-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold small">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  className="form-control form-control-sm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite la contraseña"
                  required
                />
              </div>

              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary btn-sm px-4">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
