import api from './api';

const token = localStorage.getItem('token');

const config = {
    headers: {Authorization: `Bearer ${token}`}
}

const listadoZonas = () => {
    return api
        .get(`http://localhost/api/obtenerZonasDescarga`, config)
        .then(response => response.data);
};

export default { listadoZonas };