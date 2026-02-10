import api from './api';

const token = localStorage.getItem('token');

const config = {
    headers: {Authorization: `Bearer ${token}`}
}

const listadoOperarios = () => {
    return api
        .get(`http://localhost/api/obtenerOperarios`, config)
        .then(response => response.data);
};

export default { listadoOperarios };