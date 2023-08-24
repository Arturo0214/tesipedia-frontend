import React from 'react'
import './cotizaciones.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import WhatsAppButton from '../../components/WhatsApp/WhatsAppButton'

const Cotizaciones = () => {
  return (
    <>
    <div className="container-fluid">
    <header>
      <Navbar/>
    </header>
    <main>
      <div className='cotizaciones'>Cotizaciones</div>
    </main>
    <footer>
      <Footer/>
    </footer>
    <WhatsAppButton></WhatsAppButton>
    </div>
    </>
  )
}

export default Cotizaciones