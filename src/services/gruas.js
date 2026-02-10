import api from './api';

const baseUrl = 'http://localhost/api';

const token = localStorage.getItem('token');

const config = {
    headers: {Authorization: `Bearer ${token}`}
}

const listadoGruas = () => {
    return api
        .get(`${baseUrl}/obtenerGruas`, config)
        .then(response => response.data);
};

const crearGrua = (nuevaGrua) => {
    return api
        .post(`${baseUrl}/crearGrua`, nuevaGrua, config)
        .then(response => response.data);
};

const modificarGrua = (id, nuevaGrua) => {
    return api
        .patch(`${baseUrl}/actualizarBuque/${id}`, nuevaGrua, config)
        .then((response) => response.data)
        .catch((error) => {
            console.log(error.response.statusText);
            throw error;
        })
}

export default {
    listadoGruas,
    crearGrua,
    modificarGrua
};