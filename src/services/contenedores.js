import api from "./api";

  const listadoContenedores = () => {
    return api
      .get('/obtenerContenedor')
      .then((response) => response.data);
  };


  const crearContenedor = (nuevoContenedor) => {
    return api
      .post('/crearContenedor', nuevoContenedor)
      .then((response) => response.data);
  };


  const modificarContenedor = (id, contenedorActualizado) => {
    return api
      .patch(`/actualizarContenedor/${id}`,contenedorActualizado)
      .then((response) => response.data)
      .catch((error) => {
        console.error(
          "Error al actualizar contenedor:",
          error.response?.statusText || error.message,
        );
        throw error;
      });
  };


  const eliminarContenedor = (id) => {
    return api
      .delete(`/borrarContenedor/${id}`)
      .then((response) => response.data);
  };


  /*const obtenerUbicacionContenedor = (id) =>{
      return api
      .get(`/contenedor/${id}/ubicacion`)
      .then((response) => response.data);
  }*/


  export default {
    listadoContenedores,
    crearContenedor,
    modificarContenedor,
    eliminarContenedor,
    //obtenerUbicacionContenedor
  };


