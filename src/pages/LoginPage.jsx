import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()
  const { login } = useUser()

  const handleSubmit = async (e) => {
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

    const result = await login(email, password)

    if (!result.ok) {
      setError(result.message || 'Usuario o contraseña incorrectos')
      return
    }

    setSuccess(true)
    setTimeout(() => {
      navigate('/')
    }, 400)
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-dark text-white rounded-top-4 py-3">
              <h5 className="mb-0">
                <i className="fa-solid fa-lock me-2" /> Iniciar sesión
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
                  Inicio de sesión exitoso 🎉
                </div>
              )}

              <form onSubmit={handleSubmit} className="text-start">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    required
                  />
                </div>

                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary px-4">
                    Ingresar
                  </button>
                </div>

                <p className="mt-3 small text-muted">
                  Estos datos ahora se validan contra <code>/api/auth/login</code>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
