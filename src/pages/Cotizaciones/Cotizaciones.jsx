import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import WhatsAppButton from '../../components/WhatsApp/WhatsAppButton';
import './cotizaciones.css';
import tesis from '../../assets/libros.png';
import { loadUserRequests, removeRequestForUser } from '../../features/requests/requestSlice';
import PaymentModal from '../../components/PaymentModal/PaymentModal';

const Cotizaciones = () => {
  const user = useSelector((state) => state.auth.user);
  const userRequests = useSelector((state) => state.request.userRequests[user._id] || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [selectedCotizacion, setSelectedCotizacion] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserRequests(user._id));
  }, [dispatch, user._id]);

  const handleRemoveRequest = (requestId) => {
    dispatch(removeRequestForUser({ userId: user._id, requestId }));
  };

  const handleModalOpen = (cotizacion) => {
    setSelectedCotizacion(cotizacion);
    setIsModalOpen(true);
    setClicked(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setClicked(false);
  };

  return (
    <div className="container-fluid">
      <header>
        <Navbar />
      </header>
      <main>
        <div className="cotizaciones">
          <h1>Mis Cotizaciones</h1>
          <div className="cotizaciones-list container-fluid">
            {userRequests.length > 0 ? (
              userRequests.map((cotizacion) => (
                <div className="card cotizacion-card" key={cotizacion._id}>
                  <div className="tesis-imagen">
                    <h4 className="card-text text-center">{cotizacion.tipoTrabajo}</h4>
                    <img src={tesis} alt="" />
                    <button className="btn btn-info" onClick={() => handleModalOpen(cotizacion)}>
                      Proceder al pago
                    </button>
                  </div>
                  <div className="tesis-texto">
                    <h5 className="card-title">Titulo del trabajo: {cotizacion.title}</h5>
                    <p className="card-text"><strong>Nivel de Estudios:</strong> {cotizacion.nivelEstudios}</p>
                    <p className="card-text"><strong>Área de Estudios:</strong> {cotizacion.areaEstudios}</p>
                    <p className="card-text"><strong>Requerimientos:</strong> {cotizacion.requerimientos}</p>
                    <p className="card-text"><strong>Extensión:</strong> {cotizacion.extension} cuartillas</p>
                    <h5>Costo de la cotización: {cotizacion.costo ? cotizacion.costo.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : '0 MXN'} MXN</h5>
                    <div className="button-container">
                      <button className="btn btn-danger eliminar" onClick={() => handleRemoveRequest(cotizacion._id)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No tienes solicitudes cargadas.</p>
            )}
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
      <WhatsAppButton />
      {/* Pasa las funciones set correspondientes en lugar de las funciones originales */}
      <PaymentModal isOpen={isModalOpen} closeModal={handleModalClose} cotizacion={selectedCotizacion} />
    </div>
  );
};

export default Cotizaciones;


