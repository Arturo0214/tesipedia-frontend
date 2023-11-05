import { useEffect, useState } from 'react';
import { getUserFromCookie, setUserToCookie } from '../../features/auth/authService';
import { logout, reset } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Visitantes from './AdminComponents/Visitantes/Visitantes';
import Usuarios from './AdminComponents/Usuarios/Usuarios'
import Cotizaciones from './AdminComponents/Cotizaciones/Cotizaciones';
import Pagos from './AdminComponents/Pagos/Pagos'
import Proyectos from './AdminComponents/Proyectos/Proyectos'
import Mensajes from './AdminComponents/Mensajes/Mensajes'
import './admin.css';

const Admin = () => {
  const [user, setUser] = useState(getUserFromCookie());
  const [selectedSection, setSelectedSection] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userCookie = getUserFromCookie();
    if (userCookie) {
      setUser(userCookie);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setUserToCookie(user);
    }
  }, [user]);

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const renderSelectedSection = () => {
    switch (selectedSection) {
      case 'visitantes':
        return <Visitantes />;
      case 'usuarios':
        return <Usuarios />;
      case 'cotizaciones':
        return <Cotizaciones />;
      case 'pagos':
        return <Pagos />;
      case 'proyectos':
        return <Proyectos />;
      case 'mensajes':
        return <Mensajes />;
      default:
        return <Visitantes/>;
    }
  };
  
  return (
    <>
      <div className='container-fluid'>
        <main className='admin'>
          <div className='admin-left'>
            <div className='admin-user'>
              <h4>{user.name}</h4>
              <i className='fas fa-bell'></i>
            </div>
            <div
              className={`admin-section ${selectedSection === 'visitantes' ? 'selected' : ''}`}
              onClick={() => handleSectionClick('visitantes')}
            >
              <h6>Visitantes</h6>
            </div>
            <div
              className={`admin-section ${selectedSection === 'mensajes' ? 'selected' : ''}`}
              onClick={() => handleSectionClick('mensajes')}
            >
              <h6>Mensajes</h6>
            </div>
            <div
              className={`admin-section ${selectedSection === 'proyectos' ? 'selected' : ''}`}
              onClick={() => handleSectionClick('proyectos')}
            >
              <h6>Proyectos</h6>
            </div>
            <div
              className={`admin-section ${selectedSection === 'usuarios' ? 'selected' : ''}`}
              onClick={() => handleSectionClick('usuarios')}
            >
              <h6>Usuarios</h6>
            </div>
            <div
              className={`admin-section ${selectedSection === 'cotizaciones' ? 'selected' : ''}`}
              onClick={() => handleSectionClick('cotizaciones')}
            >
              <h6>Cotizaciones</h6>
            </div>
            <div
              className={`admin-section ${selectedSection === 'pagos' ? 'selected' : ''}`}
              onClick={() => handleSectionClick('pagos')}
            >
              <h6>Pagos</h6>
            </div>
            <div className='admin-logout'>
              <button className='btn ' onClick={onLogout}>Cerrar Sesión</button>
            </div>
          </div>
          <div className='admin-right'>
            {renderSelectedSection()}
          </div>
        </main>
      </div>
    </>
  );
};

export default Admin;
