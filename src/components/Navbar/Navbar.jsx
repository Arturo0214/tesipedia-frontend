import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import menu from '../../assets/menu.png'
import './navbar.css'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState(false)
  
  const toggleNavbar = () => {
    setIsActive(!isActive)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsActive(window.innerWidth < 992)
    };

    // Verificar el tamaño de la ventana al montar el componente
    handleResize()

    // Agregar el evento para verificar el tamaño de la ventana cada vez que cambie
    window.addEventListener('resize', handleResize)

    // Eliminar el evento cuando el componente se desmonte
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return (
    <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
    <div className={`container-fluid ${isActive ? 'navbar-header' : 'navbar-header'}`}>
      {/* Logo and Navbar Toggler */}
      <Link to="/" className="navbar-brand">
        <img className="logo" src={logo} alt="Logo" />
      </Link>
      <button
        className={`navbar-toggler ${isActive ? 'collapsed' : ''}`}
        type="button"
        aria-label="Toggle navigation"
        onClick={toggleNavbar}
        >
        <img className="menu-icon" src={menu} alt="Menu" />
      </button>
        {/* Collapsible Navbar Content */}
        <div className={`collapse navbar-collapse ${isActive ? 'show' : ''}`} id="navbarColor03">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/features" className="nav-link">
                Features
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/pricing" className="nav-link">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                to="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </Link>
              <div className="dropdown-menu">
                <Link to="#" className="dropdown-item">
                  Action
                </Link>
                <Link to="#" className="dropdown-item">
                  Another action
                </Link>
                <Link to="#" className="dropdown-item">
                  Something else here
                </Link>
                <div className="dropdown-divider" />
                <Link to="#" className="dropdown-item">
                  Separated link
                </Link>
              </div>
            </li>
          </ul>
          <div className="navbar-end">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button className="btn btn-primary">
                  <Link to="/login" className="nav-link">
                    <strong>Inicia Sesión</strong>
                  </Link>
                </button>
              </li>
              <li className="nav-item">
                <button className="btn btn-info">
                  <Link to="/register" className="nav-link">
                    <strong>Regístrate</strong>
                  </Link>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar