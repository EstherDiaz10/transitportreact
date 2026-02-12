import api from './api';

const token = localStorage.getItem('token');

const config = {
    headers: {Authorization: `Bearer ${token}`}
}

const listadoBuques = () => {
    return api
        .get('/obtenerBuques', config)
        .then(response => response.data);
};

const crearBuque = (nuevoBuque) => {
    return api
        .post('/crearBuque', nuevoBuque, config)
        .then(response => response.data);
};

const modificarBuque = (id, nuevoBuque) => {
    return api
        .patch('/actualizarBuque/${id}', nuevoBuque, config)
        .then((response) => response.data)
        .catch((error) => {
            console.log(error.response.statusText);
            throw error;
        })
}

/*const modificarBuque = (id, nuevoBuque) => {
    let data = new FormData();
    data.append('nombre', nuevoBuque.nombre);
    data.append('tipo', nuevoBuque.tipo);
    data.append('estado', nuevoBuque.estado);
    data.append('capacidad', Number(nuevoBuque.capacidad));
    data.append('observaciones', nuevoBuque.observaciones);

    return axios({
        url: `${baseUrl}/actualizarBuque/${id}`,
        method: 'PATCH',
        data: data
    }).then(function(response){
        return response.data;
    }).catch(function (error){
        console.log(error.response.statusText);
        throw error;
    })
        
        .patch(`${baseUrl}/actualizarBuque/${id}`, nuevoBuque)
        .then(response => response.data);
        
};*/

export default {
    listadoBuques,
    crearBuque,
    modificarBuque
};
