import { useState, useEffect } from "react";
import Listado from "../components/Listado";
import BotonCrear from "../components/BotonCrear";
import Filtrado from "../components/Contenedores/FiltradoContenedor";
import Busqueda from "../components/Busqueda";
import Detalles from "../components/Contenedores/DetallesContenedor";
import Modal from "../components/Modal";
import FormAnyadirContenedor from "../components/Formularios/FormAnyadirContenedor";
import contenedorService from "../services/contenedores";


const PagContenedores = () => {
    const [selectFiltrado, setFiltrarEstado] = useState("");
    const [inputBuscar, setBuscar] = useState("");
    const [contenedores, setContenedores] = useState([]);
    const [contenedorSeleccionado, setContenedorSeleccionado] = useState(null);
    const [crearElemento, setCrearElemento] = useState(false);


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
        ? "grid grid-cols-3 md:grid-cols-[80px_0.7fr_1.3fr_1fr_130px_130px] items-center gap-3 px-4 md:px-0"
        : "grid grid-cols-3 md:grid-cols-[60px_1fr_2.3fr_1fr_60px] items-center gap-5 px-4 md:px-0";


    const columnasContenedores = [
        {
            titulo: "ID",
            valor: "id",
            prefijo: "C-",
        },
        {
            titulo: "Compañía",
            valor: "companyia",
          
            'estilos': contenedorSeleccionado ? 'hidden truncate' : ''
        },
        {
            titulo: "Nº Serie",
            valor: "num_serie",
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


    const ultimoId =
        contenedores && contenedores.length > 0
            ? Math.max(...contenedores.map((c) => c.id)) + 1
            : 1;


    return (
        <>
            <h1 className="fixed top-20 text-3xl font-bold text-[#2A5677]">
                Listado de Contenedores
            </h1>


            <div
                className={`${!contenedorSeleccionado ? "w-[94%]" : "w-[50%]"} pt-5 flex justify-between`}
            >
                <Filtrado setFiltrarEstado={setFiltrarEstado} />
                <Busqueda setBuscar={setBuscar} />
            </div>


            <div className={`${contenedorSeleccionado ? "lg:w-[53%]" : "w-full"}`}>
                <Listado
                    elementos={contenedoresAMostrar}
                    estructuraGrid={estructuraGrid}
                    columnas={columnasContenedores}
                    setElementoSeleccionado={setContenedorSeleccionado}
                    elementoSeleccionado={contenedorSeleccionado}
                    icono={icono}
                />


                <BotonCrear
                    tipo="contenedor"
                    setCrearElemento={setCrearElemento}
                    seleccionado={contenedorSeleccionado}
                />


                {contenedorSeleccionado !== null && (
                    <div className="fixed z-20 left-0 bottom-0 rounded-t-[50px] h-[80%] bg-[#B7D0E1] lg:absolute lg:top-0 right-0 lg:h-full lg:left-auto lg:w-[45%] lg:rounded-t-[0px] lg:rounded-l-[50px] lg:pt-[7%] lg:pl-[5%] lg:pr-[5%]">
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
        </>
    );
};


export default PagContenedores;
