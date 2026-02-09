import axios from 'axios';

const enviarLogin = (datosUser, rol) => {
    console.log('Datos:', datosUser, 'Rol:', rol);
    return axios
        .post(`http://localhost/api/login/${rol}`, datosUser)
        .then(response => console.log(response.data));
};

export default { enviarLogin };