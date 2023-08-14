import { useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { getUserFromCookie, setUserToCookie } from '../../features/auth/authService'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import WhatsAppButton from '../../components/WhatsApp/WhatsAppButton'
import Work from '../../components/Work/Work'
import About from '../../components/About/About'
import Datos from '../../components/Datos/Datos'
import Why from '../../components/Why/Why'
import './dashboard.css'
import reactLogo from '../../assets/react.svg'

const Dashboard = () => {
  const [user, setUser] = useState(getUserFromCookie())
  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    const handleUserUpdate = () => {
      const userCookie = getUserFromCookie()
      setUser(userCookie)
    }
    handleUserUpdate()
  }, [])

  // Función para guardar el usuario en la cookie cuando se actualiza el estado global
  useEffect(() => {
    if (user) {
      setUserToCookie(user)
    }
  }, [user])
  
  return (
    <>
      <div className="container">
        <header>
          <Navbar/>
        </header>
        <main>
          {isAuthenticated ? (
            // Aquí va el contenido del dashboard para usuarios autenticados
            <div className="dashboard-content inicio-container">
              <div className="columns is-mobile">
                <div className="column">First column</div>
                <div className="column">Second column</div>
                <div className="column">Third column</div>
                <div className="column">Fourth column</div>
              </div>
              <p>
              Usuario autenticado:
                <strong>
                  {user ? user.name : 'No hay usuario'}
                  </strong>
              </p>
              <WhatsAppButton/>
            </div>
          ) : (
            // Aquí va el contenido del dashboard para usuarios no autenticados
            <>
              <section id='inicio-section' class='container-fluid inicio-container'>
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
                <div class="transparent-container container-fluid">
                  <div className="caption-left">
                      <div class="caption-1">
                        <h2>Las grandes ideas tienen pequeños inicios...</h2>
                      </div>
                    <div className="logo-container">
                      <img src={reactLogo} alt="React Logo" className="react-logo" />
                    </div>
                      <div class="caption-2">
                        <p>Nosotros te ayudamos a hacerlas realidad.</p>
                      </div>
                    </div>
                  <div className="caption-right">
                    <div class="caption-3">
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
              <WhatsAppButton/>
            </>
          )}
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  )
}

export default Dashboard
