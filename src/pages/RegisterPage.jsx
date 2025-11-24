// src/pages/RegisterPage.jsx
import React, { useState } from 'react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

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
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="auth-page">
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-auth">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-header bg-dark text-white rounded-top-4 py-3">
                <h5 className="mb-0">
                  <i className="fa-solid fa-user-plus me-2"></i> Crear cuenta
                </h5>
              </div>

              <div className="card-body px-4 py-4">
                {error && (
                  <div className="alert alert-danger py-2 mb-3 text-start">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="alert alert-success py-2 mb-3 text-start">
                    Registro exitoso 🎉
                  </div>
                )}

                <form onSubmit={handleSubmit} className="text-start">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@correo.com"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Confirmar contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repite la contraseña"
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary px-4">
                      Enviar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
