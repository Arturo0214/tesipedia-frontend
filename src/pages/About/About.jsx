import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import './about.css'

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <h1>Sobre Nosotros</h1>
        <p>
          Bienvenido a nuestra página "About". Aquí puedes agregar una descripción de tu empresa,
          proyecto o cualquier información que desees compartir con los visitantes.
        </p>
        <p>
          También puedes incluir detalles sobre el equipo, los valores, la historia o cualquier otro
          contenido relevante.
        </p>
      </div>
      <Footer />
    </>
  )
}

export default About
