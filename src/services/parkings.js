import api from './api';

const listadoParkings = () => {
    return api
        .get('/obtenerParkings')
        .then(response => response.data);
};



export default { listadoParkings };
