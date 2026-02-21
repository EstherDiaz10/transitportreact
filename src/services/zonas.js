import api from './api';

const listadoZonas = () => {
    return api
        .get('/obtenerZonasDescarga')
        .then(response => response.data);
};

export default { listadoZonas };