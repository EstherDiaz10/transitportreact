import { useState, useEffect } from "react";
import Listado from "../components/Listado";
import BotonCrear from "../components/BotonCrear";
import Filtrado from "../components/Contenedores/FiltradoContenedor";
import FiltradoMovilCont from "../components/Contenedores/FiltradoMovilCont";
import Busqueda from "../components/Busqueda";
import Detalles from "../components/Contenedores/DetallesContenedor";
import Modal from "../components/Modal";
import FormAnyadirContenedor from "../components/Formularios/FormAnyadirContenedor";
import contenedorService from "../services/contenedores";
import Swal from 'sweetalert2';

const PagContenedores = () => {
  const [selectFiltrado, setFiltrarEstado] = useState("");
  const [inputBuscar, setBuscar] = useState("");
  const [contenedores, setContenedores] = useState([]);
  const [contenedorSeleccionado, setContenedorSeleccionado] = useState(null);
  const [crearElemento, setCrearElemento] = useState(false);
  const [mostrarFiltrosMovil, setMostrarFiltrosMovil] = useState(false);

  useEffect(() => {
    contenedorService.listadoContenedores().then((data) => {
      setContenedores(data);
    });
  }, []);

  let contenedoresAMostrar = contenedores;

  if (selectFiltrado !== "") {
    contenedoresAMostrar = contenedoresAMostrar.filter(
      (c) => (c.ubicacion ?? "") === selectFiltrado,
    );
  }

  if (inputBuscar !== "") {
    const texto = inputBuscar.toLowerCase();

    contenedoresAMostrar = contenedoresAMostrar.filter((c) => {
      return (
        (c.num_serie ?? "").toLowerCase().includes(texto) ||
        ("C-" + c.id).toLowerCase().includes(texto) ||
        (c.companyia ?? "").toLowerCase().includes(texto) ||
        (c.ubicacion ?? "").toLowerCase().includes(texto) ||
        ("P-" + (c.parking_id ?? "")).toLowerCase().includes(texto)
      );
    });
  }

  contenedoresAMostrar = contenedoresAMostrar.map((c) => ({
    ...c,
    existeTexto: Boolean(c.existe) ? "Disponible" : "No disponible",
  }));

  const colorEstado = (existe) => {
    return existe ? "#87A884" : "#925152";
  };

  const estructuraGrid = !contenedorSeleccionado
    ? "grid grid-cols-[0.2fr_1fr_1fr_0.4fr] lg:grid-cols-[80px_0.7fr_1.3fr_1fr_130px_130px] md:grid-cols-[60px_0.7fr_1fr_0.4fr_130px] items-center gap-3 px-4 md:px-0"
    : "grid grid-cols-[0.2fr_1fr_1fr_auto] lg:grid-cols-[60px_1fr_2.3fr_1fr_60px] md:grid-cols-[60px_0.7fr_1fr_0.4fr_130px] items-center gap-5 px-4 md:px-0";

  const columnasContenedores = [
    {
      titulo: "ID contenedor",
      valor: "id",
      prefijo: "C-",
    },
    {
      titulo: "Compañía",
      valor: "companyia",
      estilos: contenedorSeleccionado ? "hidden truncate" : "hidden lg:block",
    },
    {
      titulo: "Nº Serie",
      valor: "num_serie",
      estilos: "hidden md:block",
    },
    {
      titulo: "Ubicación",
      valor: "ubicacion",
    },
  ];

  const icono = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.15a16,16,0,0,0-8.32,14V173.85a16,16,0,0,0,8.32,14l88,48.15a15.88,15.88,0,0,0,15.36,0l88-48.15a16,16,0,0,0,8.32-14V80.15A16,16,0,0,0,223.68,66.15ZM128,32l80,43.74-32.53,17.8L95.47,49.81ZM120,223.72,40,180V91.5l80,43.74Zm8-112.25L48,67.73l32.53-17.8,80,43.73Zm80,68.53L136,223.72V135.24l80-43.74Z"></path>
    </svg>
  );

  const eliminarContenedor = async (id) => {
    
      const resultado = await Swal.fire({
          title: '¿Estás seguro?',
          text: 'Vas a eliminar el contenedor',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
      });

      if(resultado.isConfirmed) {
        try {
          await contenedorService.eliminarContenedor(id);
          const data = await contenedorService.listadoContenedores();
          setContenedores(data);

          Swal.fire(
              '¡Eliminado!',
              'El contenedor ha sido eliminado correctamente.',
              'success'
          );

        } catch (error) {
          console.error("Error al eliminar", error);
          Swal.fire(
              'Error',
              'Hubo un problema al eliminar el contenedor.',
              'error'
          );
        }
      }
  };

  const ultimoId =
    contenedores && contenedores.length > 0
      ? Math.max(...contenedores.map((c) => c.id)) + 1
      : 1;

  return (
    <div className="pb-23 lg:pb-0 md:ml-7">
      <h1 className="mt-5 md:mt-0 ml-5 md:ml-0 md:ml-0 text-3xl font-bold text-[#2A5677] md:absolute md:top-20 w-[80%]">
        Listado de Contenedores
      </h1>

      <div className="flex items-center mt-4 md:mt-0 gap-1">
        <div
          className={`w-full md:w-[97%] ${!contenedorSeleccionado ? "lg:w-[94%]" : "lg:w-[50%]"} md:pt-8 flex justify-between`}
        >
          <Filtrado setFiltrarEstado={setFiltrarEstado} />
          <Busqueda setBuscar={setBuscar} elementoSeleccionado={''} />
        </div>
        <div className="md:hidden flex items-center w-[20%]">
          <button
            onClick={() => setMostrarFiltrosMovil(!mostrarFiltrosMovil)}
            className="w-10 h-10 bg-[#DFECF5] p-1 ml-1 rounded-[5px] font-bold flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#5F84A2"
              viewBox="0 0 256 256"
            >
              <path d="M136,120v96a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm64,72a8,8,0,0,0-8,8v16a8,8,0,0,0,16,0V200A8,8,0,0,0,200,192Zm24-32H208V40a8,8,0,0,0-16,0V160H176a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16ZM56,160a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V168A8,8,0,0,0,56,160Zm24-32H64V40a8,8,0,0,0-16,0v88H32a8,8,0,0,0,0,16H80a8,8,0,0,0,0-16Zm72-48H136V40a8,8,0,0,0-16,0V80H104a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Z"></path>
            </svg>
          </button>
        </div>
      </div>
      {mostrarFiltrosMovil && (
        <div className="absolute right-7 top-26 mt-2 w-64 bg-white rounded-[10px] shadow-xl border border-[#DFECF5] z-50 p-4">
          <h3 className="text-[#5F84A2] font-bold mb-3 border-b border-[#DFECF5] pb-2">
            Opciones de Filtro
          </h3>

          <div className="flex flex-col gap-4">
            <FiltradoMovilCont
              setFiltrarEstado={setFiltrarEstado}
              filtrarEstado={selectFiltrado}
            />
            <button
              onClick={() => setMostrarFiltrosMovil(false)}
              className="bg-[#5F84A2] text-white py-2 rounded-[5px] mt-2 font-bold hover:opacity-90"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      <div
        className={`w-full ${contenedorSeleccionado ? "lg:w-[53%]" : "w-full"}`}
      >
        {contenedores.length > 0 ? (
          <div className="ml-5 mr-3 md:mr-0 md:ml-0">
            <Listado
              elementos={contenedoresAMostrar}
              estructuraGrid={estructuraGrid}
              columnas={columnasContenedores}
              setElementoSeleccionado={setContenedorSeleccionado}
              elementoSeleccionado={contenedorSeleccionado}
              icono={icono}
              eliminarElemento={eliminarContenedor}
            />
          </div>
        ) : (
          <p className="flex justify-center mt-10 mb-10 mr-17">
            No hay contenedores para mostrar
          </p>
        )}

        <BotonCrear
          tipo="contenedor"
          setCrearElemento={setCrearElemento}
          seleccionado={contenedorSeleccionado}
        />

        {contenedorSeleccionado !== null && (
          <div className="absolute z-20 left-0 right-0 top-45 md:top-58 rounded-t-[30px] bg-[#B7D0E1] lg:absolute lg:top-0 lg:right-0 lg:h-full lg:left-auto lg:w-[47%] lg:rounded-t-[0px] lg:rounded-l-[50px] lg:pt-[7%] lg:pl-[5%] lg:pr-[5%]">
            <Detalles
              contenedor={contenedorSeleccionado}
              setContenedorSeleccionado={setContenedorSeleccionado}
              setContenedores={setContenedores}
            />
          </div>
        )}
      </div>

      <Modal
        modalAbierto={crearElemento}
        cerrarModal={() => setCrearElemento(false)}
      >
        <FormAnyadirContenedor
          ultimoId={ultimoId}
          cerrarModal={() => setCrearElemento(false)}
          setContenedores={setContenedores}
        />
      </Modal>
    </div>
  );
};

export default PagContenedores;
