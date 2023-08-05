import Dashboard from "./pages/Dashboard/Dashboard"
import './index.css'
import Login from './pages/Login/Login'
import Register from "./pages/Register/Register"
import {Routes, Route} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {

  return (
    <>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='*' element={<h3>Page not found 404</h3>}/> 
        </Routes>
    <ToastContainer/>
    </>
  )
}

export default App
