import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { logout, reset } from '../../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Link as ScrollLink } from 'react-scroll'
import logo from '../../assets/logo.png'
import menu from '../../assets/menu.png'
import './navbar.scss'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [isActive, setIsActive] = useState(false)
  const location = useLocation()

  const toggleNavbar = () => {
    setIsActive(!isActive)
  }

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (!e.target.closest('.navbar')) {
        setIsActive(false)
      }
    }
    document.addEventListener('click', handleDocumentClick)
    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  const isOnDashboard = location.pathname === '/'

  return (
    <nav className="navbar navbar-expand-lg bg-light fixed-top" data-bs-theme="light">
      <div className='container-fluid'>
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
        <div className={`collapse navbar-collapse ${isActive ? 'show' : ''}`} id="navbarColor03">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              {isOnDashboard ? (
                <ScrollLink
                  to="inicio-section"
                  smooth={true}
                  duration={350}
                  offset={-110}
                  className="nav-link"
                >
                  Inicio
                  <span className="visually-hidden">(current)</span>
                </ScrollLink>
              ) : (
                <Link to="/" className="nav-link">
                  Inicio
                  <span className="visually-hidden">(current)</span>
                </Link>
              )}
            </li>
            {/* Condición para ocultar los botones */}
            {isOnDashboard && (
              <>
                <li className="nav-item">
                  <ScrollLink
                    to="about-section"
                    smooth={true}
                    duration={350}
                    offset={-90}
                    className="nav-link"
                  >
                    ¿Quiénes somos?
                  </ScrollLink>
                </li>
                <li className="nav-item">
                  <ScrollLink
                    to="why-section"
                    smooth={true}
                    duration={350}
                    offset={-110}
                    className="nav-link"
                  >
                    ¿Por qué elegirnos?
                  </ScrollLink>
                </li>

                <li className="nav-item">
                  <ScrollLink
                    to="work-section"
                    smooth={true}
                    duration={350}
                    offset={-100}
                    className="nav-link"
                  >
                    ¿Cómo trabajamos?
                  </ScrollLink>
                </li>

                <li className="nav-item">
                  <ScrollLink
                    to="datos-section"
                    smooth={true}
                    duration={350}
                    offset={-10}
                    className="nav-link"
                  >
                    Tratamiento de Datos
                  </ScrollLink>
                </li>
              </>
            )}
          </ul>
          <div className="navbar-end">
            {user ? (
              // Si el usuario está autenticado, mostramos el botón de cerrar sesión
              <button className="btn btn-danger" onClick={onLogout}>
                <strong>Cerrar Sesión</strong>
              </button>
            ) : (
              // Si el usuario no está autenticado, mostramos los botones de inicio de sesión y registro
              <>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      <button className="btn btn-primary">
                        <strong>Inicia Sesión</strong>
                      </button>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      <button className="btn btn-info">
                        <strong>Regístrate</strong>
                      </button>
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar





