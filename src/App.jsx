import Dashboard from "./pages/Dashboard/Dashboard"
import './index.css'
import Login from './pages/Login/Login'
import Register from "./pages/Register/Register"
import About from "./pages/About/About"
import Work from "./pages/Work/Work"
import Prices from "./pages/Prices/Prices"
import {Routes, Route} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {

  return (
    <>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/pricing' element={<Prices/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/work' element={<Work/>}/>
          <Route path='*' element={<h3>Page not found 404</h3>}/> 
        </Routes>
    <ToastContainer/>
    </>
  )
}

export default App
