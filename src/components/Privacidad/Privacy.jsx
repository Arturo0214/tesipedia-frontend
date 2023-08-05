import WhatsAppButton from "../WhatsApp/WhatsAppButton"
import './privacy.css'

const Precios = () => {
  return (
    <>
    <main>
      <div className="dashboard-content form-container">
        <p>Contenido del dashboard para usuarios no autenticados</p>
        <WhatsAppButton/>
      </div>
    </main>
    </>
  )
}

export default Precios