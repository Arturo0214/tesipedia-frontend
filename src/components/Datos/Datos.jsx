import './datos.css'

import datos from '../../assets/aplicaciones.png'

const Datos = () => {
  return (
    <>
    <main>
      <div className="datos-content">
        <div className="column-1 text-center">
          <h3>🔒 Tu Privacidad es Nuestra Prioridad 🔒</h3>
          <img src={datos} alt="" />
          <p>
          Queremos que sepas que implementamos rigurosas medidas de seguridad para proteger 
          tus datos en cada paso del camino. Desde el momento en que compartes tus detalles 
          con nosotros hasta cualquier proceso que involucre el tratamiento de tu 
          información, seguimos los más altos estándares de seguridad de la industria
           para garantizar que tus datos estén siempre protegidos.
          </p>
        </div>
        <div className="column-2 text-center">
          <h3>Nuestro Compromiso con Tu Privacidad:</h3>
          <ul>
            <li>
            <strong className='privacy'>
            Confidencialidad Absoluta:
            </strong>
             Tus datos personales nunca serán 
             compartidos con terceros sin tu 
             consentimiento expreso. Mantenemos estrictos controles 
             internos para asegurarnos de que tus datos estén siempre a salvo.
            </li>

            <li>
            <strong className='privacy'>
            Seguridad Avanzada: 
            </strong>
            Utilizamos tecnologías de vanguardia para proteger
             tus datos contra accesos no autorizados, ataques cibernéticos y cualquier 
             amenaza potencial.
            </li>
          </ul>
        </div>
      </div>
    </main>
    </>
  )
}

export default Datos