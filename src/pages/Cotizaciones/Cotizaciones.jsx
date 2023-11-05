import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import WhatsAppButton from '../../components/WhatsApp/WhatsAppButton';
import tesis from '../../assets/libros.png';
import { loadUserRequests, removeRequestForUser } from '../../features/requests/requestSlice';
import PaymentModal from '../../components/PaymentModal/PaymentModal';
import { pdfjs } from 'react-pdf';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './cotizaciones.css';

const customStyles = {
  content: {
    top: 'calc(45% - 260px)',
    left: 'calc(27% - 250px)',
    width: '1200px',
    bottom: 'auto',
    marginRight: 'auto',
    transform: 'rotateX(20deg)',
    maxWidth: '1600px',
    border: '1px solid #ccc',
    borderRadius: '20px',
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
    zIndex: "1",
  },
};

pdfjs.GlobalWorkerOptions.workerSrc = `tesipedia-frontend/node_modules/pdfjs-dist/build/pdf.worker.js`

Modal.setAppElement('#root'); // Establece el elemento raíz de tu aplicación

const Cotizaciones = () => {
  const user = useSelector((state) => state.auth.user);
  const userRequests = useSelector((state) => state.request.userRequests[user._id] || []);
  const [selectedCotizacion, setSelectedCotizacion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserRequests(user._id));
  }, [dispatch, user._id]);

  const handleRemoveRequest = (requestId) => {
    dispatch(removeRequestForUser({ userId: user._id, requestId }));
  };

  const handleOpenPDFViewer = (cotizacion) => {
    setSelectedCotizacion(cotizacion);
    setIsPdfViewerOpen(true);
  };

  const handleClosePDFViewer = () => {
    setSelectedCotizacion(null);
    setIsPdfViewerOpen(false);
  };
  const handleModalOpen = (cotizacion) => {
    setSelectedCotizacion(cotizacion);
    setIsModalOpen(true);
    setClicked(true);
    console.log("Detalles de la solicitud:", cotizacion);
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
                    <p className="card-text"><strong>Titulo del trabajo: </strong>{cotizacion.title}</p>
                    <p className="card-text"><strong>Nivel de Estudios:</strong> {cotizacion.nivelEstudios}</p>
                    <p className="card-text"><strong>Área de Estudios:</strong> {cotizacion.areaEstudios}</p>
                    <p className="card-text"><strong>Requerimientos:</strong>
                    {cotizacion.requerimientos.file ? (
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleOpenPDFViewer(cotizacion);
                        }}
                      >
                        {cotizacion.requerimientos.file.originalname}
                      </a>
                    ) : (
                      'N/A'
                    )}
                    </p>
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
      <Modal
        style={customStyles}
        isOpen={isPdfViewerOpen}
        onRequestClose={handleClosePDFViewer}
        contentLabel="PDF Viewer Modal"
        ariaHideApp={false}
      >
        <button className="btn close-button" onClick={handleClosePDFViewer}>
        <FontAwesomeIcon icon={faTimes} size="lg" color="#333" />
        </button>
        {selectedCotizacion && selectedCotizacion.requerimientos.file ? (
          <iframe
            src={`http://localhost:8000/uploads/${selectedCotizacion.requerimientos.file.filename}`}
            width="100%"
            height="650"
          />
        ) : (
          <p>No hay PDF disponible.</p>
        )}
      </Modal>
      <PaymentModal isOpen={isModalOpen} closeModal={handleModalClose} cotizacion={selectedCotizacion} />
    </div>
  );
};

export default Cotizaciones;



