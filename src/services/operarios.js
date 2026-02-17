import api from './api';

const token = localStorage.getItem('token');

const config = {
    headers: {Authorization: `Bearer ${token}`}
}

const listadoOperarios = () => {
    return api
        .get('/obtenerOperarios', config)
        .then(response => response.data);
};

const listadoGruasOperario = (id) => {
    return api
        .get(`/obtenerGruasOperario/${id}`, config)
        .then(response => response.data);
}

export default { listadoOperarios, listadoGruasOperario };