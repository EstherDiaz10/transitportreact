import { useState, useEffect } from 'react';
import contenedorService from "../../services/contenedores";


const DetallesContenedor = ({ contenedor, setContenedorSeleccionado, setContenedores }) => {


    const [modificar, setModificar] = useState(false);
    const [datosFormulario, setDatosFormulario] = useState({ ...contenedor });


    useEffect(() => {
        setDatosFormulario({ ...contenedor });
        setModificar(false);
    }, [contenedor]);


    const inputStylePC = "bg-white p-1 pl-4 rounded-[10px] text-gray-500 w-full disabled:bg-gray-100";
    const prefijo = 'C-';


    const handleEditar = async (event) => {
        event.preventDefault();
       
        if (modificar) {
            try {
                await contenedorService.modificarContenedor(contenedor.id, datosFormulario);
                const data = await contenedorService.listadoContenedores();
                setContenedores(data);
                setContenedorSeleccionado(datosFormulario);
            } catch (error) {
                console.error("Error al actualizar:", error);
            }
            console.log("Guardando cambios:", datosFormulario);
        }
        setModificar(!modificar);
    };


    const cambiarInput = (event) => {
        const { name, value, type, checked } = event.target;
        const valorFinal = type === 'checkbox' ? checked : value;
        setDatosFormulario({ ...datosFormulario, [name]: valorFinal });
    }


    return (
        <div className="text-[#2A5677] relative p-12 lg:p-0">
            <button onClick={() => setContenedorSeleccionado(null)} className="fixed top-15 lg:static w-10 h-10 flex justify-center items-center cursor-pointer mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
                </svg>
            </button>


            <h1 className="text-3xl font-bold text-[#2A5677] mb-8">Detalles del Contenedor</h1>
           
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="font-semibold" htmlFor="id_cont">ID Sistema</label>
                        <input className={`${inputStylePC} mt-2`} type="text" id="id_cont" value={`${prefijo}${datosFormulario.id}`} readOnly />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="num_serie">Nº Serie</label>
                        <input className={`${inputStylePC} mt-2`} onChange={cambiarInput} type="text" id="num_serie" name="num_serie" value={datosFormulario.num_serie} readOnly={!modificar} />
                    </div>
                </div>


                <div className="mt-5">
                    <label className="font-semibold" htmlFor="companyia">Compañía</label>
                    <input className={`${inputStylePC} mt-2`} onChange={cambiarInput} type="text" id="companyia" name="companyia" value={datosFormulario.companyia} readOnly={!modificar} />
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                    <div>
                        <label className="font-semibold" htmlFor="buque_id">ID Buque</label>
                        <input className={`${inputStylePC} mt-2`} onChange={cambiarInput} type="number" id="buque_id" name="buque_id" value={datosFormulario.buque_id} readOnly={!modificar} />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="parking_id">ID Parking</label>
                        <input className={`${inputStylePC} mt-2`} onChange={cambiarInput} type="number" id="parking_id" name="parking_id" value={datosFormulario.parking_id} readOnly={!modificar} />
                    </div>
                </div>


                <div className="mt-5">
                    <label className="font-semibold" htmlFor="existe">Estado / Disponibilidad</label>
                    <select
                        className={`${inputStylePC} mt-2 p-1.5`}
                        onChange={cambiarInput}
                        name="existe"
                        id="existe"
                        disabled={!modificar}
                        value={datosFormulario.existe}
                    >
                        <option value={true}>Disponible</option>
                        <option value={false}>Ocupado / Tránsito</option>
                    </select>
                </div>


                <div className="mt-5">
                    <label className="font-semibold" htmlFor="observaciones">Observaciones</label>
                    <textarea
                        className={`${inputStylePC} mt-2`}
                        onChange={cambiarInput}
                        name="observaciones"
                        id="observaciones"
                        value={datosFormulario.observaciones}
                        rows="3"
                        readOnly={!modificar}
                    />
                </div>


                <div className="flex justify-center pt-8">
                    <button
                        type="button"
                        onClick={handleEditar}
                        className="bg-[#5F84A2] text-white font-bold p-2 pl-6 pr-6 rounded-[5px] flex items-center justify-around text-lg hover:bg-[#DFECF5] hover:text-[#5F84A2] border-2 border-transparent hover:border-[#5F84A2] gap-3 transition-all"
                    >
                        <span>{modificar ? "Guardar Cambios" : "Editar Detalles"}</span>
                        {!modificar ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 256 256"><path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM136,75.31,152.69,92,68,176.69,51.31,160ZM48,208V179.31L76.69,208Zm48-3.31L79.32,188,164,103.31,180.69,120Zm96-96L147.32,64l24-24L216,84.69Z"></path></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};


export default DetallesContenedor;