import api from './api';

const baseUrl = 'http://localhost/api';

const token = localStorage.getItem('token');

const config = {
    headers: {Authorization: `Bearer ${token}`}
}

const listadoOrdenes = () => {
    return api
        .get(`${baseUrl}/obtenerBuques`, config)
        .then(response => response.data);
};

const crearOrden = (nuevaOrden) => {
    return api
        .post(`${baseUrl}/crearBuque`, nuevaOrden, config)
        .then(response => response.data);
};

const modificarOrden = (id, nuevaOrden) => {
    return api
        .patch(`${baseUrl}/actualizarBuque/${id}`, nuevaOrden, config)
        .then((response) => response.data)
        .catch((error) => {
            console.log(error.response.statusText);
            throw error;
        })
}

export default {
    listadoOrdenes,
    crearOrden,
    modificarOrden
};
