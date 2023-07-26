import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../../features/auth/authSlice'
import './register.css'
import Navbar from '../../components/Navbar/Navbar'
import mail from '../../assets/email.png'
import usuario from '../../assets/usuario.png'
import passw1 from '../../assets/bloqueado.png'
import passw2 from '../../assets/candado.png'
import Swal from 'sweetalert'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const { name, email, password, password2 } = formData // destructuring
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, error, isSuccess, message } = useSelector((state) => state.auth)
  
  useEffect(() => {
    if (error) {
      toast.error(message)
    }
    if (isSuccess) {
      navigate('/login')
    }
    dispatch(reset())
  }, [user, error, isSuccess, isLoading, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      toast.error('Las contraseñas no coinciden')
    } else {
      const userData = { name, email, password }
      dispatch(register(userData))
      Swal("Register successful!", "You'll be redirected to login", "success")
    }
  }


  return (
    <>
    <header>
      <Navbar/>
    </header>
    <section className="d-flex justify-content-center">
      <form className="form" onSubmit={onSubmit}>
        <fieldset>
          <h3 className="title d-flex justify-content-center">Regístrate</h3>
          <div className="form-group">
            <div className="input-order">
            <span className="input-image">
              <img src={usuario} alt="Username" />
            </span>
            <input
              type="text"
              className="input"
              name="name"
              id="name"
              value={name}
              placeholder="Nombre completo"
              onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-order">
            <span className="input-image">
              <img src={mail} alt="Email" />
            </span>
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
            <span className="input-image">
              <img src={passw1} alt="Password" />
            </span>
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
          <div className="form-group">
            <div className="input-order">
            <span className="input-image">
              <img src={passw2} alt="Password" />
            </span>
            <input
              type="password"
              className="input"
              name="password2"
              id="password2"
              value={password2}
              placeholder="Confirma la contraseña"
              onChange={onChange}
              />
            </div>
          </div>
          </fieldset>
            <div className="submit-btn">
              <button className="btn btn-primary" type="submit">
                <strong>
                  Enviar
                </strong>
              </button>
            </div>
      </form>
    </section>
    </>
  )
}

export default Register