import api from './api';

const hacerLogout = (user) => {
    return api
        .post('/logout/', user)
        .then(response => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return response.data;
        });
};

export default { hacerLogout };