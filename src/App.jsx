import Dashboard from "./pages/Dashboard/Dashboard"
import Login from './pages/Login/Login'
import Register from "./pages/Register/Register"
import Seguimiento from './pages/Seguimiento/Seguimiento'
import Cotizaciones from "./pages/Cotizaciones/Cotizaciones"
import Admin from "./pages/Admin/Admin"
import {Routes, Route} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {

  return (
    <>
    <div className="container-fluid">
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/seguimiento' element={<Seguimiento/>}/>
          <Route path='/cotizaciones' element={<Cotizaciones/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='*' element={<h3>Page not found 404</h3>}/> 
        </Routes>
    </div>
    <ToastContainer/>
    </>
  )
}

export default App
