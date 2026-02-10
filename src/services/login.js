import api from './api';

const enviarLogin = (datosUser, rol) => {
    return api
        .post(`http://127.0.0.1/api/login/${rol}`, datosUser)
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data
        });
};

export default { enviarLogin };