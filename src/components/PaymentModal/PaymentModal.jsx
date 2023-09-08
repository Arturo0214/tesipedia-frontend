import React, { useState } from 'react';
import Modal from 'react-modal';
import { Elements } from '@stripe/react-stripe-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import stripePromise from '../../config/stripeConfig';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import './paymentModal.css';

const customStyles = {
  content: {
    width: '1000px',
    height: '600px',
    top: 'calc(50% - 290px)',
    left: 'calc(50% - 490px)',
    right: 'auto',
    bottom: 'auto',
    marginRight: 'auto',
    transform: 'rotateX(20deg)',
    border: '1px solid #ccc',
    borderRadius: '20px',
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
  },
  leftSide: {
    display: 'flex',
    flexDirection: 'column',
    flex: 4,
    padding: '30px',
    overflowY: 'scroll',
    gap: '10px',
  },

  rightSide: {
    flex: 6,
    height: '100%',
    padding: '20px', // Añade espacio interior
  },

  closeBtn: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '5px',
    right: '5px',
    background: 'white',
    border: '0.5px solid black',
    width: '27px',
    height: '27px',
    borderRadius: '50%',
    padding: '5px',
    cursor: 'pointer',
  },
  paymentMethod: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

Modal.setAppElement('#root');

const PaymentModal = ({ isOpen, closeModal, cotizacion }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  // Comprobamos si cotizacion es nulo antes de acceder a sus propiedades
  const title = cotizacion?.title || 'Título no disponible';
  const nivelEstudios = cotizacion?.nivelEstudios || 'Nivel de estudios no disponible';
  const areaEstudios = cotizacion?.areaEstudios || 'Área de estudios no disponible';
  const requerimientos = cotizacion?.requerimientos || 'Requerimientos no disponibles';
  const extension = cotizacion?.extension || 'Extensión no disponible';
  const costo = cotizacion?.costo || 0; // Cambiamos esto a un valor numérico

  // Función para manejar cambios en el método de pago seleccionado
  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };


  return (
    <Elements stripe={stripePromise}>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Modal de Pago"
        style={customStyles}
      >
        <div className="modal">
          <div style={customStyles.closeBtn} onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} size="lg" color="#333" />
          </div>
          <div style={customStyles.leftSide} className='modal-dialog-scrollable'>
            <h2>Finalizar pago</h2>
            <label>Total de la orden:</label>
            <p>{costo.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0 })} MXN</p>
            <label>
              <strong>Método de pago</strong>
            </label>
              <select
                value={selectedPaymentMethod}
                onChange={handlePaymentMethodChange}
                className='form-select'
              >
                <option value="">
                  Selecciona tu forma de pago
                </option>
                <option value="creditCard">Tarjeta de Crédito/Débito</option>
                <option value="paypal">PayPal</option>
              </select>
  
            {selectedPaymentMethod === 'creditCard' && (
              <CheckoutForm 
              selectedPayment={setSelectedPaymentMethod}
              cotizacion={cotizacion}
              costo={costo}
              />
            )}

            {selectedPaymentMethod === 'paypal' && (
              <form className='row text-center'>
                <label>Inicia sesión con PayPal</label>
                {/* Aquí puedes agregar los campos necesarios para PayPal */}
                <button type="submit" className="btn btn-primary mt-3">
                  Pagar
                </button>
              </form>
            )}
          </div>

        <div style={customStyles.rightSide} className='precios'>
          <h2 className='text-center'>Información de Cotización</h2>
          <div className="cards">
            <p><strong>Título del trabajo:</strong> {title}</p>
            <p><strong>Nivel de Estudios:</strong> {nivelEstudios}</p>
            <p><strong>Área de Estudios:</strong> {areaEstudios}</p>
            <p><strong>Requerimientos:</strong> {requerimientos}</p>
            <p><strong>Extensión:</strong> {extension} cuartillas</p>
            <h5>Costo de la cotización: {costo.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0 })} MXN</h5>
          </div>
        </div>
      </div>
    </Modal>
  </Elements>
  );
};

export default PaymentModal;
