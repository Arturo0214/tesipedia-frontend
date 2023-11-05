import './about.css'
import logo from '../../assets/logo.png'
import hat from '../../assets/sombrero.png'


const About = () => {
  return (
    <>
      <div className="about-container container-fluid">
        <div className='title'>
          <img src={logo}/>
        </div>
          <h1 className='kien'>
          ¿Quiénes somos?
          </h1>
        <div className="who container-fluid">
          <div className="quienes container-fluid">
            <div className="quienes-texto">
            <p className=''>
              Tesipedia nace como una iniciativa para facilitar el proceso de titulación de todas aquellas personas que, 
              por diversos motivos requieran apoyo externo en el desarrollo de sus trabajos de grado.
            </p>
            </div>
            <div class="graduation-hat">
                <img src={hat} alt="" />
            </div>
          </div>
        </div>
        <div className="claves">
          <div className="vision">
            <h3 className='titulo1'>
              Misión
            </h3>
            <div className="texto-mision text-justify">
             <p>
             Nuestro propósito es respaldar integralmente a personas
             que buscan el éxito en sus carreras profesionales, particularmente
             en la etapa final de sus estudios, a través de la elaboración de 
             sus tesis terminales o proyectos de grado. Nos comprometemos a 
             brindar servicios de la más alta calidad, guiando a nuestros clientes 
             en la investigación, análisis y presentación de trabajos académicos 
             sobresalientes.
             </p>
            </div>
          </div>
          <div className="vision">
            <h3 className='titulo2'>
              Visión
            </h3>
            <div className="texto-vision text-justify">
              <p>
            Ser líderes reconocidos 
            en toda latinoamérica en la asistencia y orientación para la realización de tesis y
            trabajos de grado. Nuestra visión es ser una fuerza impulsora detrás del éxito 
            profesional de innumerables individuos, brindándoles las herramientas necesarias para destacar 
            en sus campos elegidos.
            </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
