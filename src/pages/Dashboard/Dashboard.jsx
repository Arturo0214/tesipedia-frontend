import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import WhatsAppButton from '../../components/WhatsApp/WhatsAppButton'
import './dashboard.css'
import { getUserFromCookie, setUserToCookie } from '../../features/auth/authService'

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
          <Navbar />
        </header>
        <main>
          {isAuthenticated ? (
            // Aquí va el contenido del dashboard para usuarios autenticados
            <div className="dashboard-content form-container">
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
              </p> {/* Ejemplo de cómo mostrar información del usuario */}
              <WhatsAppButton></WhatsAppButton>
            </div>
          ) : (
            // Aquí va el contenido del dashboard para usuarios no autenticados
            <div className="dashboard-content form-container">
              <p>Contenido del dashboard para usuarios no autenticados</p>
              <WhatsAppButton/>
            </div>
            
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
