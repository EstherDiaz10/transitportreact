import api from './api';

const listadoOrdenes = () => {
    return api
        .get('/obtenerOrdenes')
        .then(response => response.data);
};

const crearOrden = (nuevaOrden) => {
    return api
        .post('/crearOrden', nuevaOrden)
        .then(response => response.data);
};

const modificarOrden = (id, nuevaOrden) => {
    return api
        .patch(`/actualizarOrden/${id}`, nuevaOrden)
        .then((response) => response.data)
        .catch((error) => {
            console.log(error.response.statusText);
            throw error;
        })
}

const listadoOrdenesGrua = (id) => {
    return api
        .get(`/obtenerOrdenesGrua/${id}`)
        .then(response => response.data);
}

const modificarEstadoOrden = (id) => {
    return api
        .patch(`/actualizarEstado/${id}`)
        .then(response => response.data);
}

const eliminarOrden = (id) => {
    return api
        .delete(`/borrarOrden/${id}`)
}

export default {
    listadoOrdenes,
    crearOrden,
    modificarOrden,
    listadoOrdenesGrua,
    modificarEstadoOrden,
    eliminarOrden
};
