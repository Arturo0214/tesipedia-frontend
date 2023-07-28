import React from 'react';

const WhatsAppButton = () => {
  const openWhatsApp = () => {
    // Reemplaza el número de teléfono con el que desees iniciar el chat en WhatsApp
    const phoneNumber = '+525583352096';
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  return (
    <>
    <div className="whatsapp-button" onClick={openWhatsApp}>
    <div className="whatsapp-message">
      <strong>
       ¿Tienes dudas? ¡Contáctanos!
      </strong>
    </div>
      <i className="fab fa-whatsapp"></i>
    </div>
    </>
  );
};

export default WhatsAppButton;
