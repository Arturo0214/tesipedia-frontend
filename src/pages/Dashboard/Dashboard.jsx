import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserFromCookie, setUserToCookie } from '../../features/auth/authService';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import WhatsAppButton from '../../components/WhatsApp/WhatsAppButton';
import Work from '../../components/Work/Work';
import About from '../../components/About/About';
import Datos from '../../components/Datos/Datos';
import Why from '../../components/Why/Why';
import Cotizacion from '../../components/Cotizacion/Cotizacion';
import Admin from '../Admin/Admin';
import './dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(getUserFromCookie());
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Update user state when user data changes in the cookie
  useEffect(() => {
    const userCookie = getUserFromCookie();
    if (userCookie) {
      setUser(userCookie);
    }
  }, []);

  // Save user data to cookie when user state changes
  useEffect(() => {
    if (user) {
      setUserToCookie(user);
    }
  }, [user]);

  return (
    <>
      <div className="container-fluid">
        {user && user.isAdmin ? (
          <Admin />
        ) : (
          <>
            <header>
              <Navbar />
            </header>
            <main>
              {isAuthenticated ? (
                // Aquí va el contenido del dashboard para usuarios autenticados
                <div className="dashboard-content container-fluid">
                  <Cotizacion />
                </div>
              ) : (
                // Aquí va el contenido del dashboard para usuarios no autenticados
                <>
                  <section id='about-section'>
                    <About />
                  </section>
                  <section id='why-section'>
                    <Why />
                  </section>
                  <section id='work-section'>
                    <Work />
                  </section>
                  <section id='datos-section'>
                    <Datos />
                  </section>
                </>
              )}
            </main>
            {user && !user.isAdmin && (
              // Mostrar el Footer solo si el usuario no es un administrador
              <footer>
                <Footer />
              </footer>
            )}
            <WhatsAppButton />
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;

