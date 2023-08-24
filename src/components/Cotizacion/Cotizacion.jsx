import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createRequest } from '../../features/requests/requestSlice'
import './cotizacion.css'



const Cotizacion = () => {
  const dispatch = useDispatch()

  const [showOtroTipo, setShowOtroTipo] = useState(false)
  const [archivoRequerimientos, setArchivoRequerimientos] = useState(null);


  const handleTipoTrabajoChange = (event) => {
    const selectedValue = event.target.value
    if (selectedValue === 'Otro') {
      setShowOtroTipo(true)
    } else {
      setShowOtroTipo(false)
    }
  };
  
  const handleArchivoChange = (event) => {
    const file = event.target.files[0];
    setArchivoRequerimientos(file);
  };

  const onSubmit = (event) => {
    event.preventDefault()
    // Aquí puedes realizar el envío de los datos y el archivo al backend
    // Puedes usar FormData para enviar el archivo junto con otros datos del formulario
    const formData = new FormData()
    formData.append('titulo', event.target.tituloTrabajo.value)
    // ... Otras propiedades del formulario ...
    formData.append('archivoRequerimientos', archivoRequerimientos)
    // Luego realiza la lógica de envío al servidor usando fetch, axios u otra librería
    dispatch(createRequest(formData))
  }
  
  return (
    <div className='cotizacion container-fluid'>
      <form className='formulario' onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="tituloTrabajo" className="form-label">Título del Trabajo</label>
          <input type="text" className="form-control" id="tituloTrabajo" required />
        </div>
        <div className="mb-3">
          <label htmlFor="areaEstudios" className="form-label">Área de Estudios</label>
          <select className="form-select" id="areaEstudios" required>
            <option value="">Seleccione un área...</option>
            <option value="Area1">Área 1: Ciencias Físico-Matemáticas y de las Ingenierías</option>
            <option value="Area2">Área 2: Ciencias Biológicas, Químicas y de la Salud</option>
            <option value="Area3">Área 3: Ciencias Sociales</option>
            <option value="Area4">Área 4: Humanidades y de las Artes</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="requerimientos" className="form-label">Requerimientos del Trabajo de Investigación</label>
          <textarea className="form-control" id="requerimientos" rows={3} required />
          <label htmlFor="archivoRequerimientos" className="form-label">Subir archivo de requerimientos</label>
          <input type="file" className="form-control" id="archivoRequerimientos" onChange={handleArchivoChange} />
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
          <input type="number" className="form-control" id="extension" required />
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  )
}

export default Cotizacion