import api from './api';

const listadoGruas = () => {
    return api
        .get('/obtenerGruas')
        .then(response => response.data);
};

const crearGrua = (nuevaGrua) => {
    return api
        .post('/crearGrua', nuevaGrua)
        .then(response => response.data);
};

const modificarGrua = (id, nuevaGrua) => {
    return api
        .patch(`/actualizarGrua/${id}`, nuevaGrua)
        .then((response) => response.data)
        .catch((error) => {
            console.log(error.response.statusText);
            throw error;
        })
}

const eliminarGrua = (id) => {
    return api
        .delete(`/borrarGrua/${id}`)
}

export default {
    listadoGruas,
    crearGrua,
    modificarGrua,
    eliminarGrua
};