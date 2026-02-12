import api from './api';

const token = localStorage.getItem('token');

const config = {
    headers: {Authorization: `Bearer ${token}`}
}

const listadoParkings = () => {
    return api
        .get('/obtenerParkings', config)
        .then(response => response.data);
};



export default { listadoParkings };
