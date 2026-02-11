import api from './api';

const baseUrl = 'http://localhost/api';

const token = localStorage.getItem('token');

const config = {
    headers: {Authorization: `Bearer ${token}`}
}

const listadoParkings = () => {
    return api
        .get(`${baseUrl}/obtenerParkings`, config)
        .then(response => response.data);
};



export default { listadoParkings };
