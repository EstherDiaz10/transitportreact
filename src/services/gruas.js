import api from './api';

const token = localStorage.getItem('token');

const config = {
    headers: {Authorization: `Bearer ${token}`}
}

const listadoGruas = () => {
    return api
        .get('/obtenerGruas', config)
        .then(response => response.data);
};

const crearGrua = (nuevaGrua) => {
    return api
        .post('/crearGrua', nuevaGrua, config)
        .then(response => response.data);
};

const modificarGrua = (id, nuevaGrua) => {
    return api
        .patch(`/actualizarGrua/${id}`, nuevaGrua, config)
        .then((response) => response.data)
        .catch((error) => {
            console.log(error.response.statusText);
            throw error;
        })
}

const deleteGrua = (id) => {
    return api
        .delete(`/eliminarGrua/${id}`)
}

export default {
    listadoGruas,
    crearGrua,
    modificarGrua,
    deleteGrua
};