import api from './api';

const cargar = () => {

    return api
        .get("/patio")
        .then(response => response.data);
}

export default { cargar };