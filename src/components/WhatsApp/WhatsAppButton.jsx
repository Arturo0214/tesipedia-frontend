import React from 'react'
import './whatsappbutton.scss'

const WhatsAppButton = () => {
  const openWhatsApp = () => {
    const phoneNumber = '+525583352096'
    window.open(`https://wa.me/${phoneNumber}`, '_blank')
  }

  return (
    <div className="whatsapp-button" onClick={openWhatsApp}>
      <div className="whatsapp-message">
        <strong>¿Tienes dudas? ¡Contáctanos!</strong>
      </div>
      <i className="fab fa-whatsapp"></i>
    </div>
  )
}

export default WhatsAppButton;
