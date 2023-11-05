import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllRequests, deleteRequest } from '../../../../features/requests/requestSlice';
import './cotizaciones.css';

const Cotizaciones = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.request.requests);
  const users = useSelector((state) => state.auth.users);
  const user = useSelector((state) => state.auth.user);
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAreaEstudios, setSelectedAreaEstudios] = useState('');
  const [selectedNivelEstudios, setSelectedNivelEstudios] = useState('');
  const [selectedTipoTrabajo, setSelectedTipoTrabajo] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('createdAt_desc');
  const [sortOrder, setSortOrder] = useState('desc');
  const [userNames, setUserNames] = useState({});
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    dispatch(getAllRequests());
  }, [dispatch]);

  useEffect(() => {
    const names = {};
    let pendingRequestsCount = 0;
    let completedRequestsCount = 0;
    requests.forEach((request) => {
      const user = users.find((user) => user._id === request.user);
      if (user) {
        names[request.user] = user.name;
      }
      if (request.status === 'pendiente') {
        pendingRequestsCount++;
      } else if (request.status === 'completado') {
        completedRequestsCount++;
      }
    });
    setUserNames(names);
    setPendingCount(pendingRequestsCount);
    setCompletedCount(completedRequestsCount);
    // Actualizar las solicitudes filtradas aquí
    setFilteredRequests(
      requests
        .filter(filterRequests)
        .sort((a, b) => {
          return sortOrder === 'asc'
            ? a.createdAt.localeCompare(b.createdAt)
            : b.createdAt.localeCompare(a.createdAt);
        })
    );
  }, [requests, users, searchTerm, selectedAreaEstudios, selectedNivelEstudios, selectedTipoTrabajo, selectedStatus, sortOrder, pendingCount, completedCount]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    toggleSortOrder();
  };

  const formatDateTime = (dateTimeStr) => {
    const options = {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };

    const dateTime = new Date(dateTimeStr);
    return dateTime.toLocaleString('en-US', options);
  };

  const filterRequests = (request) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const requestTitle = request.title ? request.title.toLowerCase() : '';
    const requestId = request._id ? request._id.toLowerCase() : '';
    const requestArea = request.areaEstudios ? request.areaEstudios.toLowerCase() : '';
    const requestNivelEstudios = request.nivelEstudios ? request.nivelEstudios.toLowerCase() : '';
    const requestTipoTrabajo = request.tipoTrabajo ? request.tipoTrabajo.toLowerCase() : '';
    const requestStatus = request.status ? request.status.toLowerCase() : '';

    const userName = userNames[request.user] || 'Usuario Desconocido';

    return (
      (selectedAreaEstudios === '' || requestArea.includes(selectedAreaEstudios.toLowerCase())) &&
      (selectedNivelEstudios === '' || requestNivelEstudios.includes(selectedNivelEstudios.toLowerCase())) &&
      (selectedTipoTrabajo === '' || requestTipoTrabajo.includes(selectedTipoTrabajo.toLowerCase())) &&
      (selectedStatus === '' || requestStatus.includes(selectedStatus.toLowerCase())) &&
      (requestTitle.includes(lowerSearchTerm) ||
        requestArea.includes(lowerSearchTerm) ||
        requestId.includes(lowerSearchTerm) ||
        requestNivelEstudios.includes(lowerSearchTerm) ||
        requestTipoTrabajo.includes(lowerSearchTerm) ||
        userName.toLowerCase().includes(lowerSearchTerm))
    );
  };

  const newRequestsToday = filteredRequests.filter((request) =>
  request.createdAt.startsWith(formattedToday)
  );

  const renderRequerimientos = (requerimientos) => {
    if (!requerimientos) {
      return 'N/A';
    }

    let requerimientosValue = 'N/A';

    try {
      if (requerimientos.file) {
        const parsedRequerimientos = JSON.parse(requerimientos.file);
        requerimientosValue = parsedRequerimientos.originalname || 'N/A';
      } else if (requerimientos.text) {
        requerimientosValue = requerimientos.text;
      }
    } catch (error) {
      requerimientosValue = 'N/A';
    }

    return requerimientosValue;
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedAreaEstudios('');
    setSelectedNivelEstudios('');
    setSelectedTipoTrabajo('');
    setSelectedStatus('');
    setSortBy('createdAt_desc');
    setSortOrder('desc');
  };

  const getUserName = (userId) => {
    const user = users.find((user) => user._id === userId);
    if (user) {
      return user.name;
    } else {
      return 'Usuario Desconocido';
    }
  };

  const handleDeleteRequest = (requestId) => {
    if (user.isAdmin) {
      const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta solicitud?");
      if (confirmDelete) {
        // Eliminar la solicitud
        console.log('Request eliminada:', requestId);
        dispatch(deleteRequest(requestId));
  
        // Actualizar los contadores
        const requestToDelete = requests.find((request) => request._id === requestId);
        if (requestToDelete) {
          if (requestToDelete.status === 'pendiente') {
            setPendingCount((prevCount) => prevCount - 1);
          } else if (requestToDelete.status === 'completado') {
            setCompletedCount((prevCount) => prevCount - 1);
          }
        }
        
        // Actualizar las solicitudes filtradas después de eliminar
        setFilteredRequests((prevRequests) => prevRequests.filter((request) => request._id !== requestId));
        console.log('Solicitudes filtradas actualizadas:', filteredRequests);
      }
    } else {
      alert("No tienes permisos para eliminar solicitudes.");
    }
  };
  

  return (
    <div className="cotizaciones-container container-fluid" style={{ padding: '0px' }}>
      <div className="cotizaciones-top">
        <div className="col">
          <h6 className="text-center">El número de cotizaciones nuevas el día de hoy es</h6>
          <h2>
            <strong className="text-primary text-center">{newRequestsToday.length}</strong>
          </h2>
        </div>
        <div className="col">
          <h6 className="text-center">El número de cotizaciones con status pendiente es</h6>
          <h2>
            <strong className="text-primary text-center">{pendingCount}</strong>
          </h2>
        </div>
        <div className="col">
          <h6 className="text-center">El número de cotizaciones con status completado es</h6>
          <h2>
            <strong className="text-primary text-center">{completedCount}</strong>
          </h2>
        </div>
      </div>

      <div className="cotizaciones-bottom">
        <h3 className="text-center mb-4 cotizations">Cotizaciones</h3>
        <div className="contenido">
          <div className="filtros text-center">
            <h4 className="">Filtros</h4>
            <div className="filter-selects text-center">
              <select
                className="form-select text-center"
                value={selectedAreaEstudios}
                onChange={(e) => setSelectedAreaEstudios(e.target.value)}
              >
                <option value=""> Área</option>
                <option value="Area1">Area1</option>
                <option value="Area2">Area2</option>
                <option value="Area3">Area3</option>
                <option value="Area4">Area4</option>
              </select>

              <select
                className="form-select text-center"
                value={selectedNivelEstudios}
                onChange={(e) => setSelectedNivelEstudios(e.target.value)}
              >
                <option value="">Nivel</option>
                <option value="Licenciatura">Licenciatura</option>
                <option value="Maestría">Maestría</option>
                <option value="Doctorado">Doctorado</option>
              </select>

              <select
                className="form-select text-center"
                value={selectedTipoTrabajo}
                onChange={(e) => setSelectedTipoTrabajo(e.target.value)}
              >
                <option value="">Trabajo</option>
                <option value="Tesis">Tesis</option>
                <option value="Tesina">Tesina</option>
                <option value="Protocolo">Protocolo</option>
                <option value="Otro">Otro</option>
              </select>

              <select
                className="form-select text-center"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Status</option>
                <option value="pendiente">Pendiente</option>
                <option value="en proceso">En Proceso</option>
                <option value="completado">Completado</option>
              </select>
            </div>
            <button
              className={`btn  ${sortBy === 'createdAt_desc' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleSortChange('createdAt_desc')}
            >
              Fecha
            </button>
            <button
              className={`btn ${sortBy === 'title_asc' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleSortChange('title_asc')}
            >
              Título (A-Z)
            </button>
            <button className="btn btn-warning" onClick={resetFilters}>
              Restablecer
            </button>
          </div>

          <div className="requests">
            <div className="search">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar cotizaciones por nombre, área, nivel, trabajo, usuario o id"
                aria-label="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="cotizacioness">
              <ul className="list-group">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <li key={request._id} className="list-group-item">
                      <div className="row text-center">
                        <div className="col">
                          <strong>Título:</strong>
                          <p className="text-primary">{request.title}</p>
                        </div>
                        <div className="col">
                          <strong>Área de Estudios</strong> {request.areaEstudios}
                        </div>
                        <div className="col">
                          <strong>Nivel de Estudios</strong> {request.nivelEstudios}
                        </div>
                        <div className="col">
                          <strong>Tipo de Trabajo</strong> {request.tipoTrabajo}
                        </div>
                        <div className="col">
                          <strong>Extensión</strong> {request.extension}
                        </div>
                        <div className="col">
                          <strong>Costo</strong> {request.costo}
                        </div>
                        <div className="col">
                          <strong>Status</strong> {request.status}
                        </div>
                        <div className="col">
                          <strong>Fecha:</strong> {formatDateTime(request.createdAt)}
                        </div>
                      </div>
                      <br />
                      <div className="row text-center">
                        <div className="col">
                          <strong>id:</strong> {request._id}
                        </div>
                        <div className="col text-info">
                          <strong>Usuario:</strong> {getUserName(request.user)}
                        </div>
                        <div className="col">
                          <strong>Requerimientos:</strong> {renderRequerimientos(request.requerimientos)}
                        </div>
                        <div className="col">
                          <button className="btn btn-danger" onClick={() => handleDeleteRequest(request._id)}>
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>No se encontraron cotizaciones.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cotizaciones;
