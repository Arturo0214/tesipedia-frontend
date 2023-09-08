import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserFromCookie, setUserToCookie } from '../../features/auth/authService'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import WhatsAppButton from '../../components/WhatsApp/WhatsAppButton'
import Work from '../../components/Work/Work'
import About from '../../components/About/About'
import Datos from '../../components/Datos/Datos'
import Why from '../../components/Why/Why'
import Cotizacion from '../../components/Cotizacion/Cotizacion'
import './dashboard.css'
import reactLogo from '../../assets/react.svg'

const Dashboard = () => {
  const [user, setUser] = useState(getUserFromCookie())
  const { isAuthenticated } = useSelector((state) => state.auth)

  // Update user state when user data changes in the cookie
  useEffect(() => {
    const userCookie = getUserFromCookie()
    if (userCookie) {
      setUser(userCookie)
    }
  }, [])

  // Save user data to cookie when user state changes
  useEffect(() => {
    if (user) {
      setUserToCookie(user)
    }
  }, [user])

  return (
    <>
      <div className="container-fluid">
        <header>
          <Navbar/>
        </header>
        <main>
          {isAuthenticated ? (
            // Aquí va el contenido del dashboard para usuarios autenticados
            <div className="dashboard-content container-fluid">
              <div id='cotizacion-section' >
                <Cotizacion/>
              </div>
            </div>
          ) : (
            // Aquí va el contenido del dashboard para usuarios no autenticados
            <>
              <section id='inicio-section' className='container-fluid inicio-container'>
              <div className='container-fluid stars'>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
              </div>
                <div className="transparent-container container-fluid">
                  <div className="caption-left">
                      <div className="caption-1">
                        <h2>Las grandes ideas tienen pequeños inicios...</h2>
                      </div>
                    <div className="logo-container">
                      <img src={reactLogo} alt="React Logo" className="react-logo" />
                    </div>
                      <div className="caption-2">
                        <p>Nosotros te ayudamos a hacerlas realidad.</p>
                      </div>
                    </div>
                  <div className="caption-right">
                    <div className="caption-3">
                      <p>En Tesipedia nos importa que alcances el éxito profesional, por eso te brindamos apoyo con los mejores profesionales en el área.</p>
                    </div>
                  </div>
                </div>
              </section>
              <section id='about-section'>
                <About/>
              </section>
              <section id='why-section'>
                <Why/>
              </section>
              <section id='work-section'>
                <Work />
              </section>
              <section id='datos-section'>
                <Datos />
              </section>
            </>
          )}
        </main>
          <WhatsAppButton/>
      </div>
        <footer>
          <Footer />
        </footer>
    </>
  )
}

export default Dashboard
