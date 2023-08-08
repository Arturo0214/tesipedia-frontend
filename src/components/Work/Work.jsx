import {useState, useEffect } from 'react'
import charla from '../../assets/chateando.png'
import profesional from '../../assets/medico.png'
import negocio from '../../assets/negociacion.png'
import contrato from'../../assets/trofeo.png'
import './work.css'

const Work = () => {

  const [isPaso1Visible, setPaso1Visible] = useState(false);
  const [isCharlaVisible, setCharlaVisible] = useState(false);


  useEffect(() => {
    const steps = document.querySelectorAll('.timeline-step1, .timeline-step2, .timeline-step3, .timeline-step4')
    const timeline = document.querySelector('.timeline')
    const handleScroll = () => {
      let activeStep = null
      steps.forEach((step) => {
        const rect = step.getBoundingClientRect()
        const isVisible = rect.top >= 0 && rect.bottom <= timeline.clientHeight
        if (isVisible && !activeStep) {
          activeStep = step
        }
        step.classList.remove('active')
      })
      if (activeStep) {
        activeStep.classList.add('active')
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <main>
        <div class="work-container">
          <div className='title-work'>
            <h1>¿Cómo trabajamos?</h1>
          </div>
          <div class="timeline">
            <div class="timeline-step1"></div>
              <div className='paso1'>
                <div class="paso-1">
                  <div className="paso1-division">
                    <label className='paso-1-title'>
                      <strong>
                        Paso 1
                      </strong>
                    </label>
                  <div className="text-paso-1">
                    <p>
                      Establecemos una conversación con el cliente para identificar los objetivos, alcances y metas
                      que se pretendan lograr a través de su trabajo de investigación.
                    </p>
                  </div>
               </div>
               <img className='charla' src={charla}/>
              </div>
            </div>
            <div class="timeline-step2"></div>
            <div className='paso2'>
                <div class="paso-2">
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
            </div>
            <div class="timeline-step3"></div>
            <div className='paso3'>
                <div class="paso-3">
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
               <img className='charla' src={negocio}/>
              </div>
            </div>
            <div class="timeline-step4"></div>
              <div className="paso4">
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
            <img className='contract' src={contrato}/>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Work