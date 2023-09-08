import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRequest } from '../../features/requests/requestSlice';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import './cotizacion.css';

const Cotizacion = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const userRequests = useSelector(state => state.request.userRequests[user._id] || []);

  const [showOtroTipo, setShowOtroTipo] = useState(false);
  const [archivoRequerimientos, setArchivoRequerimientos] = useState(null);
  const [areaEstudios, setAreaEstudios] = useState('');
  const [nivelEstudios, setNivelEstudios] = useState('');
  const [extension, setExtension] = useState('');
  const [costo, setCosto] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isMakingNewCotizacion, setIsMakingNewCotizacion] = useState(false);
  const [resultadoVisible, setResultadoVisible] = useState(false);
  const showResultado = submitted || resultadoVisible;
  const [loading, setLoading] = useState(false);
  const [loadingLocal, setLoadingLocal] = useState(false);

  // Verificar si el usuario ha realizado al menos una solicitud
  useEffect(() => {
    if (userRequests.length > 0) {
      setResultadoVisible(true);
    }
  }, [userRequests]);

  const handleArchivoChange = (event) => {
    const file = event.target.files[0];
    setArchivoRequerimientos(file);
  };

  const handleAreaEstudiosChange = (event) => {
    setAreaEstudios(event.target.value);
  };

  const handleExtensionChange = (event) => {
    setExtension(event.target.value);
  };

  const handleTipoTrabajoChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === 'Otro') {
      setShowOtroTipo(true);
    } else {
      setShowOtroTipo(false);
    }
  };

  const handleNivelEstudiosChange = (event) => {
    setNivelEstudios(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    setLoading(true); 
    setLoadingLocal(true); 

    const formData = new FormData();
    formData.append('title', event.target.tituloTrabajo.value);
    formData.append('areaEstudios', areaEstudios);
    formData.append('nivelEstudios', nivelEstudios);
    formData.append('requerimientos', event.target.requerimientos.value);
    formData.append('tipoTrabajo', event.target.tipoTrabajo.value);
  
    if (showOtroTipo) {
      formData.append('otroTipoTrabajo', event.target.otroTipoTrabajo.value);
    }
    formData.append('archivoRequerimientos', archivoRequerimientos);
    formData.append('extension', extension);
  
    try {
      const response = await dispatch(createRequest(formData));
      console.log("Respuesta del servidor:", response);
      if (response.payload && response.payload.user) {
        const calculatedCost = response.payload.costo;
        setCosto(calculatedCost); // Set costo based on server response
        setSubmitted(true); // Set submitted to true after successful request

        // Ocultar el spinner local después de un tiempo
        setTimeout(() => {
          setLoading(false);
          setResultadoVisible(true); // Mostrar el resultado después de la cotización exitosa
        }, 1000);

        // Ocultar el spinner local después de un tiempo
        setTimeout(() => {
          setLoadingLocal(false);
          setResultadoVisible(true); // Mostrar el resultado después de la cotización exitosa
        }, 0);

      } else {
        console.error('No se encontraron los datos de la solicitud en la respuesta del servidor.');
        setLoading(false); 
        setLoadingLocal(false)
      }
    } catch (error) {
      console.error('Error al crear la solicitud:', error);
      setLoading(false);
      setLoadingLocal(false)
    }
  }

  const resetForm = () => {
    document.getElementById("cotizacionForm").reset();
    setArchivoRequerimientos(null);
    setAreaEstudios('');
    setNivelEstudios('');
    setExtension('');
    setCosto(null);
    setSubmitted(false);
    setIsMakingNewCotizacion(true);
  };

  if (!userRequests.length && loading && !resultadoVisible){
    return <Spinner></Spinner>
  }

  return (
    <div className='container-fluid'>
    {!userRequests.length && !resultadoVisible && loading && (
      <div className="spinner-container">
        <Spinner />
      </div>
    )}
      <div className="calculadora">
      <div className={`cotizacion container-fluid ${isMakingNewCotizacion ? '' : 'cotizacion-submitted'}`}>
        <form
          id="cotizacionForm"
          className='formulario container-fluid'
          onSubmit={onSubmit}
        >
          <div className="mb-3">
            <h4 className='text-center titulo-coti'>
              Cotización
            </h4>
            <label htmlFor="tituloTrabajo" className="form-label">Título del Trabajo</label>
            <input type="text" className="form-control" id="tituloTrabajo" required />
          </div>
          <div className="mb-3">
            <label htmlFor="areaEstudios" className="form-label">Área de Estudios</label>
            <select className="form-select" id="areaEstudios" onChange={handleAreaEstudiosChange} required>
              <option value="">Seleccione un área...</option>
              <option value="Area1">Área 1: Ciencias Físico-Matemáticas y de las Ingenierías</option>
              <option value="Area2">Área 2: Ciencias Biológicas, Químicas y de la Salud</option>
              <option value="Area3">Área 3: Ciencias Sociales</option>
              <option value="Area4">Área 4: Humanidades y de las Artes</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="nivelEstudios" className="form-label">Nivel de Estudios</label>
            <select className="form-select" id="nivelEstudios" onChange={handleNivelEstudiosChange} required>
              <option value="">Seleccione un nivel...</option>
              <option value="Licenciatura">Licenciatura</option>
              <option value="Maestría">Maestría</option>
              <option value="Doctorado">Doctorado</option>
            </select>
          </div>
          <div className="mb-3 row">
            <div className="col-8">
              <label htmlFor="requerimientos" className="form-label">Requerimientos del Trabajo de Investigación</label>
              <textarea className="form-control" id="requerimientos" rows={3} required />
            </div>
            <div className="col-4 archivo">
            <input type="file" className="form-control" id="archivoRequerimientos" onChange={handleArchivoChange} />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="tipoTrabajo" className="form-label">Tipo de Trabajo</label>
            <select className="form-select" id="tipoTrabajo" onChange={handleTipoTrabajoChange} required>
              <option value="">Seleccione un tipo...</option>
              <option value="Tesis">Tesis</option>
              <option value="Tesina">Tesina</option>
              <option value="Protocolo">Protocolo de Investigación</option>
              <option value="Otro">Otro</option>
            </select>
            {showOtroTipo && (
              <input type="text" className="form-control mt-2" id="otroTipoTrabajo" placeholder="Especifique el trabajo" />
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="extension" className="form-label">Extensión del Proyecto (cuartillas)</label>
            <input type="number" className="form-control" id="extension" onChange={handleExtensionChange} required />
          </div>
          <div className="text-center">
              <button type="submit" className="btn btn-primary">Enviar</button>
          </div>
        </form>
      </div>
     {showResultado && (
          <div className={`resultado container-fluid resultado-visible`}>
            {loadingLocal ? (
              <div className="spinner-container">
                <Spinner />
              </div>
            ) : (
              userRequests.length > 0 && (
                <div className="cotizado col-12">
                  <h3 className="text-center">Costo de la cotización:</h3>
                  <h3 className="text-center">
                    {costo ? costo.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : '0 MXN'}
                  </h3>
                  <p className='text-center nota'>Nota: El costo puede variar dependiendo de los requerimientos del proyecto.</p>
                  <div className="botones col-12">
                    <div className="contacto">
                      <h5>¡Vamos allá!</h5>
                      <Link to='/cotizaciones'>
                          <button className='btn btn-info'>Cotizaciones</button>
                      </Link>
                    </div>
                    <div className="nueva-cotizacion">
                      <h5>Realizar otra cotización</h5>
                      <button className='btn btn-primary' onClick={resetForm}>Nueva cotizacion</button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}
export default Cotizacion;