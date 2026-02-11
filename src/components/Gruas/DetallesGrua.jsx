import { useState, useEffect } from 'react';
import MultiSelect from '../MultiSelect';
import gruaService from "../../services/gruas";
import operarioService from '../../services/operarios';

const DetallesGrua = ({ grua, setGruaSeleccionada, setGruas }) => {

    const [modificar, setModificar] = useState(false);
    const [datosFormulario, setDatosFormulario] = useState({ ...grua });
    const [operarios, setOperarios] = useState([]);

    useEffect(() => {
        setDatosFormulario({ ...grua });
        setModificar(false);
        
    }, [grua]);

    useEffect(() => {
        operarioService.listadoOperarios()
        .then(data => {
            const opciones = data.map(operario => ({
                value: operario.id,    
                label: operario.name   
            }));
            setOperarios(opciones);
        });
    
    }, []);

    const inputStylePC = "bg-white p-1 pl-4 rounded-[10px] text-gray-500 w-full";

    const estados = ["Disponible", "Ocupada"];
    const otroEstado = estados.filter((estado) => estado.toLowerCase() !== grua.estado);
    const prefijo = datosFormulario.tipo.toLowerCase() === 'sts' ? 'STS-' : 'SC-';
    const prefijoZona = 'ZD-';

    const handleEditar = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (modificar) {
            try {

                const datosParaEnviar = {
                    tipo: datosFormulario.tipo,
                    id_zona: datosFormulario.id_zona,
                    id_gestor: datosFormulario.id_gestor,
                    estado: datosFormulario.estado,
                    observaciones: datosFormulario.observaciones,
                    operarios: datosFormulario.operarios.map(operario => operario.id || operario.value)
                };

                console.log(datosParaEnviar);

                await gruaService.modificarGrua(grua.id, datosParaEnviar);
                const data = await gruaService.listadoGruas();
                setGruas(data);
                setGruaSeleccionada(datosFormulario);

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

    const handleSelectOperarios = (selected) => {
        setDatosFormulario({ 
            ...datosFormulario, 
            operarios: selected 
        });
    }

    const operariosMultiSelect = datosFormulario.operarios.map(operario => ({
        value: operario.id || operario.value,
        label: operario.name || operario.label
    })) || [];

    return (
        <div className="text-[#2A5677] relative p-12 md:p-0">
            <button onClick={() => setGruaSeleccionada(null)} className="fixed top-15 w-10 h-10 flex justify-center align-center cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path></svg>
            </button>
            <h1 className="text-3xl font-bold text-[#2A5677] mb-8">Detalles de la grúa</h1>
            <form action="">
                <div className="mt-5">
                    <label htmlFor="id_grua">ID grúa</label>
                    <input className={`${inputStylePC} mt-3`} type="text" id="id_grua" name="id" value={`${prefijo}${datosFormulario.id}`} readOnly />
                </div>
                <div className="mt-5">
                    <label htmlFor="tipo_grua">Tipo de grúa</label>
                    <input className={`${inputStylePC} mt-3`} onChange={cambiarInput} type="text" id="tipo_grua" name="tipo" value={`${datosFormulario.tipo.toUpperCase()}`} readOnly={!modificar} />
                </div>
                <div className="mt-5">
                    <label htmlFor="zona_grua">Zona asignada</label>
                    <input className={`${inputStylePC} mt-3`} onChange={cambiarInput} type="text" id="zona_grua" name="zona" value={`${prefijoZona}${datosFormulario.id_zona}`} readOnly={!modificar} />
                </div>
                <div className="mt-5">
                    <label htmlFor="estado_grua">Estado</label>
                    <select className={`${inputStylePC} mt-3 p-1.5`} onChange={cambiarInput} name="estado" id="estado_grua" disabled={!modificar}>
                        <option className="p-3" value={grua.estado}>{grua.estado}</option>
                        <option value={otroEstado}>{otroEstado}</option>
                    </select>
                </div>
                <div className="mt-5">
                    <label className="mb-3 block" htmlFor="operarios_grua">Operarios asignados</label>
                    <MultiSelect options={operarios} value={operariosMultiSelect} onChange={handleSelectOperarios} isDisabled={!modificar} />
                </div>
                <div className="mt-5">
                    <label htmlFor="observaciones_buque">Observaciones</label>
                    <textarea className={`${inputStylePC} mt-3`} onChange={cambiarInput} name="observaciones" id="observaciones_buque" value={datosFormulario.observaciones} rows="4" readOnly={!modificar}>
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

export default DetallesGrua;