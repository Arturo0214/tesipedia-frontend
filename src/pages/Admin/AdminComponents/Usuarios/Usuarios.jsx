import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../../../../features/auth/authSlice';
import './usuarios.css';

const Usuarios = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);
  const [searchTerm, setSearchTerm] = useState('');
  const today = new Date();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const filterUsers = (user) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const userName = user.name ? user.name.toLowerCase() : '';
    const userEmail = user.email ? user.email.toLowerCase() : '';
    const userId = user._id ? user._id.toLowerCase() : '';
  
    return (
      userName.includes(lowerSearchTerm) ||
      userEmail.includes(lowerSearchTerm) ||
      userId.includes(lowerSearchTerm)
    );
  };

  const filteredUsers = users ? users.filter(filterUsers) : [];
  
  const newUsersToday = users
    ? users.filter((user) => {
        const createdAt = new Date(user.createdAt);
        return (
          createdAt.getDate() === today.getDate() &&
          createdAt.getMonth() === today.getMonth() &&
          createdAt.getFullYear() === today.getFullYear()
        );
      })
    : [];

  return (
    <div className="usuarios-container">
      <div className="usuarios-top">
        <div className="new-users">
          <h6>El número de usuarios nuevos el día de hoy es de:</h6>
          <h2>
            <strong className="text-primary text-center">{newUsersToday.length}</strong>
          </h2>
        </div>
      </div>
      <div className="usuarios-bottom">
        <div className="users col">
          <h2>Todos los usuarios</h2>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar usuarios por nombre, correo o ID"
              aria-label="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="list-container">
          <ul className="list-group usuarios-list">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <li key={user._id} className="list-group-item row">
                  <div className="d-md-flex justify-content-between align-items-center">
                    <div className="usuario-details">
                      <span className="usuario-name">{user.name}</span>
                      <a href={`mailto:${user.email}`} className="usuario-email">
                        {user.email}
                      </a>
                      <span className='usuario-id'>
                        ID: <strong>{user._id}</strong>
                      </span>
                    </div>
                    {user.isAdmin && <span className="badge bg-primary">Admin</span>}
                  </div>
                </li>
              ))
            ) : (
              <p>No se encontraron usuarios.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Usuarios;

