import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import menu from '../../assets/menu.png';
import './navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const toggleNavbar = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    // Close the navbar when the user clicks anywhere outside of it
    const handleDocumentClick = (e) => {
      if (!e.target.closest('.navbar')) {
        setIsActive(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
