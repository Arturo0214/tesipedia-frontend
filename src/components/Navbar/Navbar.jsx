import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import 'bulma/css/bulma.min.css'
import logo from '../../assets/logo.jpeg'
import './navbar.css'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState(false)

  const toggleNavbar = () => {
    setIsActive(!isActive)
  }

  return (
    <div className="navbar-wrapper is-fixed-top container">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <button
            className={`navbar-burger ${isActive ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded={isActive ? 'true' : 'false'}
            data-target="navbarBasicExample"
            onClick={toggleNavbar}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>

        <div className={`navbar-menu ${isActive ? 'is-active' : ''} is-left`}>
          <div className="navbar-start">
            <Link to="/">
                <img className='logo' src={logo} alt="Logo" />
            </Link>
            <a className="navbar-item">About Me</a>
            <a className="navbar-item">Documentation</a>
          </div>
          <div className="navbar-end">
  
          </div>
          </div>
      </nav>
    </div>
  );
};

export default Navbar;