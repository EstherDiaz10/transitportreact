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
        console.log(response.data);
    }).catch(function (error){
        console.log(error.response.statusText);
    })
        
        /*.patch(`${baseUrl}/actualizarBuque/${id}`, nuevoBuque)
        .then(response => response.data);*/
        
};

export default {
    listadoBuques,
    crearBuque,
    modificarBuque
};
