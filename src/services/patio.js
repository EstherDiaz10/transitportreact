import api from './api';

const token = localStorage.getItem('token');

const config = {
    headers: { Authorization: `Bearer ${token}` }
}

const cargar = () => {

    return api
        .get("http://localhost/api/patio", config)
        .then(response => response.data);
}

export default { cargar };