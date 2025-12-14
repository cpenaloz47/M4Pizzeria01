import React from 'react'

export default function Profile({ email, onLogout }) {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 rounded-4 p-4">
            <h4 className="fw-bold text-center mb-4">
              <i className="fa-solid fa-user me-2"></i>
              Perfil de Usuario
            </h4>

            <p className="text-center mb-4">
              <strong>Email:</strong><br />
             {email || '—'}
            </p>

            <div className="d-flex justify-content-center">
              <button className="btn btn-danger px-4" onClick={onLogout}>
                <i className="fa-solid fa-right-from-bracket me-2"></i>
                Cerrar sesión
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
