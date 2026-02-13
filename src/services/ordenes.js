import api from './api';

const token = localStorage.getItem('token');

const config = {
    headers: {Authorization: `Bearer ${token}`}
}

const listadoOrdenes = () => {
    return api
        .get('/obtenerBuques', config)
        .then(response => response.data);
};

const crearOrden = (nuevaOrden) => {
    return api
        .post('/crearBuque', nuevaOrden, config)
        .then(response => response.data);
};

const modificarOrden = (id, nuevaOrden) => {
    return api
        .patch('/actualizarBuque/${id}', nuevaOrden, config)
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
