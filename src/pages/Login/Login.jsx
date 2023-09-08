import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { login, reset } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'
import mail from '../../assets/email.png'
import passw from '../../assets/bloqueado.png'
import Spinner from "../../components/Spinner/Spinner"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading, isSuccess, error, message } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const { email, password } = formData

  useEffect(() => {
    if (error) {
      toast.error('datos incorrectos')
    } else if (isSuccess) {
      navigate('/')
    } else {
      dispatch(reset())
    }
  }, [error, isSuccess, message])

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password} = formData // Incluimos la selección del usuario
    dispatch(login({ email, password})) // Enviamos la selección del usuario a través de la acción login()
    toast.success("login exitoso!, redirigiendo...")  
  }

  if (isLoading) {
    return <Spinner/>
  }  


  return (
    <>
    <header>
      <Navbar></Navbar>
    </header>
      <main>
        <section className="d-flex justify-content-center form-container">
          <form className="form" onSubmit={onSubmit}>
          <div className='title'>
          <h3>Inicia Sesión</h3>
          </div>
            <div className="form-group">
              <div className="input-order">
                <div className="input-image">
                  <img src={mail} alt="Email" />
                </div>
                <input
                  type="email"
                  className="input"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Correo electrónico"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-order">
                <div className="input-image">
                  <img src={passw} alt="Password" />
                </div>
                <input
                  type="password"
                  className="input"
                  name="password"
                  id="password"
                  value={password}
                  placeholder="Contraseña"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="submit-btn">
              <button className="btn btn-primary" type="submit">
                <strong>Enviar</strong>
              </button>
            </div>
          </form>
        </section>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  )
}

export default Login;
