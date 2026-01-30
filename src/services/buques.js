import axios from 'axios';

const baseUrl = 'http://localhost/api';

const listadoBuques = () => {
    return axios
        .get(`${baseUrl}/obtenerBuques`)
        .then(response => response.data);
};

const crearBuque = (nuevoBuque) => {
    return axios
        .post(`${baseUrl}/crearBuque`, nuevoBuque)
        .then(response => response.data);
};

const modificarBuque = (id, nuevoBuque) => {
    return axios
        .patch(`${baseUrl}/actualizarBuque/${id}`, nuevoBuque)
        .then(response => response.data);
};

export default {
    listadoBuques,
    crearBuque,
    modificarBuque
};
