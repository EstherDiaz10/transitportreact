import api from './api';

const enviarLogin = (datosUser, rol) => {
    return api
        .post(`/login/${rol}`, datosUser)
        .then(response => {
            if (response.data.token) {
                sessionStorage.setItem('token', response.data.token);
            }
            return response.data
        });
};

const hacerLogout = (user) => {
    return api
        .post('/logout/', user)
        .then(response => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            return response.data;
        });
};

export default { enviarLogin, hacerLogout };