import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import WhatsAppButton from '../../components/WhatsApp/WhatsAppButton'
import './seguimiento.css'

const Precios = () => {
  return (
      <>
    <div className='container-fluid'>
    <header>
      <Navbar/>
    </header>
    <main className='seguimiento'>
      <div>Seguimiento</div>
    </main>
    <WhatsAppButton></WhatsAppButton>
    </div>
    <footer>
      <Footer/>
    </footer>
    </>
  )
}

export default Precios