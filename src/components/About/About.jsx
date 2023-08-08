import './about.css'
import logo from '../../assets/logo.png'
const About = () => {
  return (
    <>
      <div className="about-container">
        <div className='title'>
          <img src={logo}/>
        </div>
          <h1>
          ¿Quiénes somos?
          </h1>
        <div className="who">
          <p>
            Bienvenido a nuestra página "About". Aquí puedes agregar una descripción de tu empresa,
            proyecto o cualquier información que desees compartir con los visitantes.
          </p>
          <p>
            También puedes incluir detalles sobre el equipo, los valores, la historia o cualquier otro
            contenido relevante.
          </p>
        </div>
        <br />
        <div className="why">
        <h1>
        ¿Por qué elegir Tesipedia?
        </h1>
        <ul>
          <li>
            <h3>1</h3>
          </li>
          <li>
            <h3>2</h3>
          </li>
          <li>
            <h3>3</h3>
          </li>
          <li>
            <h3>4</h3>
          </li>
          <li>
            <h3>5</h3>
          </li>
        </ul>
          </div>
      </div>
    </>
  )
}

export default About
