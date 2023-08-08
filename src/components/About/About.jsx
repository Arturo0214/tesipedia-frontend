import './about.css'
import logo from '../../assets/logo.png'
import uno from '../../assets/no1.png'
import dos from '../../assets/no2.png'
import tres from '../../assets/no3.png'
import cuatro from '../../assets/no4.png'
import cinco from '../../assets/no5.png'


const About = () => {
  return (
    <>
      <div className="about-container container-fluid">
        <div className='title'>
          <img src={logo}/>
        </div>
          <h1>
          ¿Quiénes somos?
          </h1>
        <div className="who container-fluid">
          <p>
            Tesipedia tiene como objetivo ayudar a todas aquellas personas que quieran alcanzar el éxito profesional
            mediante la realización de trabajos de grado con profesionales dedicados especialmente a la investigación.
          </p>
          <p>
            Estamos conscientes sobre los grandes desafíos que se pueden presentar cuando se quiere obtener un título
            de grado y queremos ayudarte. No siempre es posible contar con el tiempo suficiente para poder concluir los trabajos de 
            investigación.
          </p>
          <li>
            Buscamos brindarte ese empujoncito hacia el éxito profesional, apoyándote con tu trabajo de grado.
          </li>

        </div>
        <div className="why container-fluid">
        <h3>
        ¿Por qué elegir Tesipedia?
        </h3>
        <ul className='list'>
          <div className="left">
            <div className="filas">
              <div className="filaimg">
                <img src={uno} alt="1"/>
              </div>
              <div className="filatxt">
                <div className="fila-col">
                <h5>Sistema "Anti-plagio"</h5>
                  <div className="texto">
                    <p>
                      Nos basamos en un fundamento "Anti-plagio", todos nuestros trabajos son únicos y son cuidadosamente elaborados
                      para no incurrir en malas prácticas. 
                      <p>
                        Usamos software especializado para la detección del plagio, 
                        por lo que puedes estar 100% de que tu trabajo se encuentra
                        en buenas manos.
                      </p>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="filas">
              <div className="filaimg">
                <img src={dos} alt="2"/>
              </div>
              <div className="filatxt">
              <div className="fila-col">
                  <h5>Uso de bibliografía actualizada. </h5>
                </div>
                <div className="texto">
                  <p>
                  Únicamente utilizamos bibliografía de no más de 5 años atrás en la elaboración de nuestros trabajos
                  de investigación para poder brindarle al cliente un trabajo de muy alta calidad.
                  </p>
                </div>
              </div>
            </div>
            <div className="filas">
              <div className="filaimg">
              <img src={tres} alt="3"/>
              </div>
                <div className="filatxt">
                <div className="fila-col">
                  <h5>
                  ¿No tienes tema de investigación?
                  </h5>
                  <div className="texto">
                    <p>
                    ¡No te preocupes!, nuestros especialistas te ayudarán a definirlo en caso de que no cuentes
                      con un tema; además, se encargarán de definir detalladamente la estructura de tu tesis o tesina.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
          <div className="filas">
              <div className="filaimg">
              <img src={cuatro} alt="4"/>
              </div>
                <div className="filatxt">
                <div className="fila-col">
                  <h5 className='text-justify'>
                  Contamos con especialistas altamente capacitados
                  </h5>
                  <div className="texto">
                    <p>
                    Nuestros especialistas cuentan con una excelente formación y alta experiencia en el ámbito.
                    Nos aseguramos de que puedas sentirte seguro durante toda tu experiencia en Tesipedia para brindarte
                    el mejor servicio.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="filas">
              <div className="filaimg">
              <img src={cinco} alt="4"/>
              </div>
                <div className="filatxt">
                <div className="fila-col">
                  <h5>
                  Tiempos de entrega 
                  </h5>
                  <div className="texto">
                    <p>
                      El tiempo de entrega es relativamente corto, garantizando la calidad del trabajo por el que estás pagando.
                      Además, llevarás un seguimiento continuo de tu proyecto durante todo el proceso de elaboración. 
                      <br />
                      <p className='text-center'>
                      ¡Solo necesitas registrarte e iniciar sesión!
                      </p>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ul>
          </div>
      </div>
    </>
  )
}

export default About
