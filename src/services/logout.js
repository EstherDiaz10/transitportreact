import api from './api';

const hacerLogout = (user) => {
    return api
        .post(`http://127.0.0.1/api/logout/`, user)
        .then(response => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return response.data;
        });
};

export default { hacerLogout };