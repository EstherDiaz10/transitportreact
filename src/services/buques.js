import api from "./api";

const listadoBuques = () => {
  return api
    .get("/obtenerBuques")
    .then((response) => response.data);
};

const listadoBuquesConContenedores = () => {
  return api
    .get("/obtenerBuquesConContenedores")
    .then((response) => response.data);
};

const crearBuque = (nuevoBuque) => {
  return api
    .post("/crearBuque", nuevoBuque)
    .then((response) => response.data);
};

const modificarBuque = (id, nuevoBuque) => {
  return api
    .patch("/actualizarBuque/${id}", nuevoBuque)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response.statusText);
      throw error;
    });
};

const eliminarBuque = (id) => {
  return api
    .delete(`/borrarBuque/${id}`)
    .then((response) => response.data);
};

export default {
  listadoBuques,
  listadoBuquesConContenedores,
  crearBuque,
  modificarBuque,
  eliminarBuque
};
