import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import './work.css'
import charla from '../../assets/chateando.png'
import profesional from '../../assets/medico.png'
import negocio from '../../assets/negociacion.png'

const Work = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      
      <main className="work-container">
        <div className='title-work'>
          <h1>¿Cómo trabajamos?</h1>
        </div>
        <div className='paso-1'>
          <div className="paso1-division">
          <label className='paso-1-title'>
            <strong>
            Paso 1
            </strong>
          </label>
          <div className="text-paso-1">
            <p>
            Establecer una conversación con el cliente para identificar los objetivos, alcances y metas
            que se requieran alcanzar a través de su trabajo de investigación.
            </p>
          </div>
        </div>
          <img className='charla' src={charla}/>
        </div>
        <div className="paso-2">
          <div className="paso2-division">
            <label className='paso-2-title'>
              <strong>
              Paso 2
              </strong>
            </label>
            <div className="text-paso-2">
              <p>
              Designamos al mejor profesional con especialidad en el área, 
              quien estará a cargo del desarrollo del trabajo de investigación y brindará
              seguimiento constante al cliente sobre los avances del mismo.
              </p>
            </div>
          </div>
          <img className='profesional' src={profesional}/>
        </div>
        <div className="paso-3">
          <div className="paso3-division">
            <label className='paso-3-title'>
              <strong>
              Paso 3
              </strong>
            </label>
            <div className="text-paso-3">
              <p>
              Con base en la informacion proporcionada, realizaremos una cotización del trabajo a realizar,
              brindando el mejor presupuesto para que el cliente alcance sus objetivos.
              </p>
            </div>
          </div>
            <img className='negocio' src={negocio}/>
        </div>
        <div className="paso-4">
        <label className='paso-4-title'>
          <strong>
          Paso 4
          </strong>
        </label>
        <div className="text-paso-4">
          <p>
           ¡Contratación del servicio!
          </p>
        </div>
        </div>
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  )
}

export default Work
