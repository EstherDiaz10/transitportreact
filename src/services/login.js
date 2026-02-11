import api from './api';

const enviarLogin = (datosUser, rol) => {
    return api
        .post(`/login/${rol}`, datosUser)
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data
        });
};

export default { enviarLogin };