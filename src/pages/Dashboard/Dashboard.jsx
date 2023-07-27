import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // Importamos useSelector
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import './dashboard.css';

const Dashboard = () => {
  // Eliminamos el estado de isLoggedIn ya que obtendremos la información desde Redux
  const { isAuthenticated } = useSelector((state) => state.auth); // Obtenemos la información de autenticación desde el estado global

  // No es necesario el useEffect para obtener la información del usuario autenticado, ya que lo obtenemos desde Redux.

  return (
    <>
      <div className="container">
        <header>
          <Navbar />
        </header>
        <main>
          {isAuthenticated ? (
            // Aquí va el contenido del dashboard para usuarios autenticados
            <div className="dashboard-content">
              <div className="columns is-mobile">
                <div className="column">First column</div>
                <div className="column">Second column</div>
                <div className="column">Third column</div>
                <div className="column">Fourth column</div>
              </div>
            </div>
          ) : (
            // Aquí va el contenido del dashboard para usuarios no autenticados
            <div className="dashboard-content">
              <p>Contenido del dashboard para usuarios no autenticados</p>
            </div>
          )}
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Dashboard;
