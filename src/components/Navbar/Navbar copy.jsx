import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo2.png'
import './navbar.css'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState(false)

  const toggleNavbar = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img className="logo" src={logo} alt="Logo" />
        </Link>
        <button
          className={`navbar-toggler ${isActive ? 'collapsed' : ''}`}
          type="button"
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`navbar-collapse ${isActive ? 'collapse show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">About Me</Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">Documentation</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                <strong>Inicia Sesión</strong>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                <strong>Regístrate</strong>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
  )
}

export default Navbar