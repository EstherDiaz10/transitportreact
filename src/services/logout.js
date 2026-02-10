import axios from 'axios';

const token = localStorage.getItem('token');

const config = {
    headers: {Authorization: `Bearer ${token}`}
}

const hacerLogout = (user) => {
    return axios
        .post(`http://127.0.0.1/api/logout/`, user, config)
        .then(response => response.data);
};

export default { hacerLogout };