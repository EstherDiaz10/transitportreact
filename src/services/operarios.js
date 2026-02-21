import api from './api';

const listadoOperarios = () => {
    return api
        .get('/obtenerOperarios')
        .then(response => response.data);
};

const listadoGruasOperario = (id) => {
    return api
        .get(`/obtenerGruasOperario/${id}`)
        .then(response => response.data);
}

export default { listadoOperarios, listadoGruasOperario };