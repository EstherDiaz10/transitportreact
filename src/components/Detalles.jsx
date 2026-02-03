import { useState, useEffect } from 'react';
import buqueService from "../services/buques";

const Detalles = ({ buque, setBuques, setBuqueSeleccionado }) => {

    const [modificar, setModificar] = useState(false);
    const [datosFormulario, setDatosFormulario] = useState({ ...buque });

    useEffect(() => {
        setDatosFormulario({ ...buque });
        setModificar(false);
    }, [buque]);

    const inputStyle = "bg-white p-1 pl-4 rounded-[10px] text-gray-500 w-full";

    const valueEstados = (estado) => {
        switch (estado.toLowerCase()) {
            case "en espera":
                return "en espera";

            case "atracado":
                return "atracado";

            case "inactivo":
                return "inactivo";
        }
    }

    const estados = ["En espera", "Atracado", "Salido"];
    const restoEstados = estados.filter((estado) => estado !== buque.estado);

    const handleEditar = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (modificar) {
            try {
                await buqueService.modificarBuque(buque.id, datosFormulario);
                const data = await buqueService.listadoBuques();
                setBuques(data);
                setBuqueSeleccionado(datosFormulario);
            } catch (error) {
                console.error(error);
            }
        }

        setModificar(!modificar);
    };


    const cambiarInput = (event) => {
        const { name, value } = event.target;
        setDatosFormulario({ ...datosFormulario, [name]: value });
    }

    return (
        <div className="text-[#2A5677]">
            <h1 className="text-3xl font-bold text-[#2A5677] mb-8">Detalles del buque</h1>
            <form action="">
                <div className="mt-5">
                    <label htmlFor="id_buque">ID buque</label>
                    <input className={`${inputStyle} mt-3`} type="text" id="id_buque" name="id" value={`B-${datosFormulario.id}`} readOnly />
                </div>
                <div className="mt-5">
                    <label htmlFor="estado_buque">Estado</label>
                    <select className={`${inputStyle} mt-3 p-1.5`} onChange={cambiarInput} name="estado" id="estado_buque" readOnly={!modificar}>
                        <option className="p-3" value={`${valueEstados(buque.estado)}`}>{buque.estado}</option>
                        {restoEstados.map((estado) =>
                            <option key={`${valueEstados(estado)}`} value={`${valueEstados(estado)}`}>{estado}</option>
                        )}
                    </select>
                </div>
                <div className="mt-5">
                    <label htmlFor="nombre_buque">Nombre</label>
                    <input className={`${inputStyle} mt-3`} onChange={cambiarInput} type="text" id="nombre_buque" name="nombre" value={`${datosFormulario.nombre}`} readOnly={!modificar} />
                </div>
                <div className="mt-5">
                    <label htmlFor="tipo_buque">Tipo</label>
                    <input className={`${inputStyle} mt-3`} onChange={cambiarInput} type="text" id="tipo_buque" name="tipo" value={`${datosFormulario.tipo}`} readOnly={!modificar} />
                </div>
                <div className="mt-5">
                    <label htmlFor="capacidad_buque">Cantidad contenedores</label>
                    <input className={`${inputStyle} mt-3`} onChange={cambiarInput} type="number" id="capacidad_buque" name="capacidad" value={`${datosFormulario.capacidad}`} readOnly={!modificar} />
                </div>
                <div className="mt-5">
                    <label htmlFor="observaciones_buque">Observaciones</label>
                    <textarea className={`${inputStyle} mt-3`} onChange={cambiarInput} name="observaciones" id="observaciones_buque" value={datosFormulario.observaciones} rows="4" readOnly={!modificar}>
                    </textarea>
                </div >
                <div className="flex justify-center pt-5">
                    <button type="button" onClick={handleEditar} className="bg-[#5F84A2] text-white font-bold p-2 pl-4 pr-4 rounded-[5px] flex items-center justify-around text-lg hover:bg-[#DFECF5] hover:text-[#5F84A2] hover:border-3 hover:border-[#5F84A2] gap-3">
                        <span>{modificar ? "Guardar" : "Editar"}</span>
                        {!modificar ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 256 256"><path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM136,75.31,152.69,92,68,176.69,51.31,160ZM48,208V179.31L76.69,208Zm48-3.31L79.32,188,164,103.31,180.69,120Zm96-96L147.32,64l24-24L216,84.69Z"></path></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )

}

export default Detalles;