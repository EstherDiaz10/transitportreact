import axios from 'axios';

const enviarLogin = (datosUser, rol) => {
    return axios
        .post(`http://127.0.0.1/api/login/${rol}`, datosUser)
        .then(response => response.data);
};

export default { enviarLogin };