import './footer.scss'

const Footer = () => {
  return (
    <footer className={`bg-light text-center text-dark`}>
      <section className="footer">
          <div className="row">
            <div className="col-12 col-md-1 text-justify">
              <a className='tesipedia'>
                <strong>Tesipedia</strong>
              </a>
            </div>
            <br />
            <div className="col-12 col-md-1 text-justify">
              <a>Preguntas frecuentes</a>
            </div>
            <div className="col-12 col-md-1 text-justify">
              <a>Privacidad</a>
            </div>
            <div className="col-12 col-md-1 text-justify">
              <a>Términos y condiciones</a>
            </div>
            <div className="col-12 col-md-1 text-justify">
              <a>Contáctanos</a>
            </div>
            <div className="col-12 col-md-1 text-justify">
              <a>Trabaja con nosotros</a>
            </div>
            <div className="col-12 col-md-1 text-justify">
              <a>Todos los derechos reservados © {new Date().getFullYear()}</a>
            </div>
          </div>
      </section>
    </footer>
  )
}

export default Footer