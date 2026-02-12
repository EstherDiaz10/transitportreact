import { useState, useEffect } from 'react';
import ordenService from "../../services/ordenes";
import buqueService from "../../services/buques";
import parkingService from "../../services/parkings";
import gruaService from "../../services/gruas";
import operarioService from "../../services/operarios";
import Select from 'react-select/base';

const DetallesOrden = ({ orden, setOrdenSeleccionada, setOrdenes }) => {

    const [modificar, setModificar] = useState(false);
    const [datosFormulario, setDatosFormulario] = useState({ ...orden });

    const [buques, setBuques] = useState([]);
    const [parkings, setParkings] = useState([]);
    const [contenedoresDisponibles, setContenedoresDisponibles] = useState([]);
    const [gruas, setGruas] = useState([]);
    const [operarios, setOperarios] = useState([]);

    useEffect(() => {

        buqueService.listadoBuques()
            .then(data => 
                setBuques(data))
            .catch(error => 
                console.error(error));

        parkingService.listadoParkings()
            .then(data => 
                setParkings(data))
            .catch(error => 
                console.error(error));

        operarioService.listadoOperarios()
            .then(data => 
                setOperarios(data))
            .catch(error => 
                console.error(error));

        gruaService.listadoGruas()
            .then(data => 
                setGruas(data)
            )
            .catch(error => 
                console.error(error));

    }, []);

    useEffect(() => {

        const gruaSTSOrden = orden.gruas.find((grua) => grua.tipo.toLowerCase() === 'sts'); 
        const gruaSCOrden = orden.gruas.find((grua) => grua.tipo.toLowerCase() === 'sc'); 

        const operarioGruaSTS = orden.operarios.find((operario) => operario.pivot.tipo === 'sts');
        const operarioGruaSC = orden.operarios.find((operario) => operario.pivot.tipo === 'sc');

        setDatosFormulario({ 
            ...orden,
            id_grua_sts: gruaSTSOrden || null,
            id_grua_sc: gruaSCOrden || null,
            id_operario_sts: operarioGruaSTS || '',
            id_operario_sc: operarioGruaSC ||'' 
        });
        
        setModificar(false);
        
    }, [orden]);

    /*Obtengo los contenedores del buque y parking asociados a la orden*/
    useEffect(() => {

        if (datosFormulario.tipo === 'descarga' && datosFormulario.id_buque) {
            const buque = buques.find((buque) => 
                buque.id === datosFormulario.id_buque
            );
            setContenedoresDisponibles(buque ? buque.contenedores : []);

        } else if (datosFormulario.tipo === 'carga' && datosFormulario.id_parking) {
            const parking = parkings.find((parking) => 
                parking.id === datosFormulario.id_parking);
            setContenedoresDisponibles(parking ? [parking.contenedor] : []);
        }

    }, [datosFormulario.id_buque, datosFormulario.id_parking, datosFormulario.tipo]);

    const inputStylePC = "bg-white p-1 pl-4 rounded-[10px] text-gray-500 w-full";

    const valueEstados = (estado) => {
        switch (estado) {
            case "Pendiente":
                return "pendiente";

            case "En proceso STS":
                return "en_proceso_sts";

            case "En zona descarga":
                return "en_zona_desc";

            case "En proceso SC":
                return "en_proceso_sc";

            case "Completada":
                return "completada";
        }
    }

    const estados = ["Pendiente", "En proceso STS", "En zona descarga", "En proceso SC", "Completada"];
    const restoEstados = estados.filter((estado) => estado !== orden.estado);

    const tipos = ["Carga", "Descarga"];
    const otroTipo = tipos.filter((tipo) => tipo.toLowerCase() !== orden.tipo);

    const prioridades = ['Alta', 'Media', 'Baja'];
    const restoPrioridades = prioridades.filter((prioridad) => prioridad.toLowerCase() !== orden.prioridad);

    const prefijo = orden.tipo === 'descarga' ? 'OD-' : 'OC-';

    /*Filtros necesarios para preparar los datos de operarios para lo que espera recibir el Select (value y label)*/
    const opcionesOperariosSTS = operarios
        .filter((operario) => operario.id_grua === Number(datosFormulario.id_grua_sts))
        .map((operario) => ({value: operario.id, label: operario.name}));

    const opcionesOperariosSC = operarios
        .filter((operario) => operario.id_grua === Number(datosFormulario.id_grua_sc))
        .map((operario) => ({value: operario.id, label: operario.name}));

    const operarioSTSSeleccionado = opcionesOperariosSTS.find(operario => operario.value === datosFormulario.id_operario_sts) || null;
    const operarioSCSeleccionado = opcionesOperariosSC.find(operario => operario.value === datosFormulario.id_operario_sc) || null;

    /*Filtros para preparar los datos de buques y parkings para el Select*/
    const opcionesBuque = buques.map((buque) => ({
        value: buque.id, 
        label: `Buque B-${buque.id} - ${buque.nombre}`
    }));

    const opcionesParking = parkings.map((parking) => ({
        value: parking.id, 
        label: `Parking P-${parking.id}`
    }));

    const parkingSeleccionado = opcionesParking.find((parking) => parking.value === datosFormulario.id_parking ||null);
    const buqueSeleccionado = opcionesBuque.find((buque) => buque.value === datosFormulario.id_buque ||null);

    const gruasSTS = gruas.filter((grua) => grua.tipo.toLowerCase() === 'sts');
    const gruasSC = gruas.filter((grua) => grua.tipo.toLowerCase() === 'sc');

    /*Filtros para preparar los datos de gruas para el Select*/
    const opcionesGruaSTS = gruasSTS.map((grua) => ({
        value: grua.id, 
        label: `Grúa STS-${grua.id}`
    }));

    const opcionesGruaSC = gruasSC.map((parking) => ({
        value: grua.id, 
        label: `Grúa SC-${grua.id}`
    }));

    const gruaSTSSeleccionada = opcionesGruaSTS.find((grua) => grua.value === datosFormulario.id_grua_sts ||null);
    const gruaSCSeleccionada = opcionesGruaSC.find((grua) => grua.value === datosFormulario.id_grua_sc ||null);

    const handleEditar = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (modificar) {
            try {
                await ordenService.modificarOrden(orden.id, datosFormulario);
                const data = await ordenService.listadoBuques();
                setOrdenes(data);
                setOrdenSeleccionada(datosFormulario);
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
        <div className="text-[#2A5677] relative p-12 md:p-0">
            <button onClick={() => setOrdenSeleccionada(null)} className="fixed top-15 w-10 h-10 flex justify-center align-center cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path></svg>
            </button>
            <h1 className="text-3xl font-bold text-[#2A5677] mb-8">Detalles de la orden</h1>
            <form action="">
                <div className="mt-5 gap-5">
                    <div className="w-[50%]">
                        <label htmlFor="id_buque">ID orden</label>
                        <input className={`${inputStylePC} mt-3`} type="text" id="id_orden" name="id" value={`${prefijo}${datosFormulario.id}`} readOnly />
                    </div>
                    <div className="w-[50%]">
                        <label htmlFor="estado_orden">Estado</label>
                        <select className={`${inputStylePC} mt-3 p-1.5`} onChange={cambiarInput} name="estado" id="estado_orden" readOnly={!modificar}>
                            <option className="p-3" value={orden.estado}>{orden.estado}</option>
                            {restoEstados.map((estado) =>
                                <option key={estado} value={valueEstados(estado)}>{estado}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="mt-5 gap-5">
                    <div className="w-[50%]">
                        <label htmlFor="tipo_orden">Tipo de orden</label>
                        <select className={`${inputStylePC} mt-3 p-1.5`} onChange={cambiarInput} name="tipo" id="tipo_orden" disabled={!modificar}>
                            <option className="p-3" value={orden.tipo}>{orden.tipo}</option>
                            <option value={otroTipo}>{otroTipo}</option>
                        </select>
                    </div>
                    <div className="w-[50%]">
                        <label htmlFor="prioridad_orden">Prioridad</label>
                        <select className={`${inputStylePC} mt-3 p-1.5`} onChange={cambiarInput} name="prioridad" id="prioridad_orden" readOnly={!modificar}>
                            <option className="p-3" value={orden.prioridad}>{orden.prioridad}</option>
                            {restoPrioridades.map((prioridad) =>
                                <option key={prioridad} value={prioridad.toLowerCase()}>{prioridad}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="mt-5 gap-5">
                    <div className="w-[50%]">
                        <label htmlFor="destino_orden">Origen</label>
                        <Select 
                            options={datosFormulario.tipo === 'carga' ? opcionesParking : opcionesBuque} 
                            value={datosFormulario.tipo === 'carga' ? parkingSeleccionado : buqueSeleccionado} 
                            onChange={(seleccionado) => {
                                const campo = datosFormulario.tipo === 'carga' ? 'id_parking' : 'id_buque'
                                setDatosFormulario({...datosFormulario, [campo]: seleccionado.value});
                            }} 
                            isDisabled={!modificar} 
                        />
                    </div>
                    <div className="w-[50%]">
                        <label htmlFor="destino_orden">Destino</label>
                        <Select 
                            options={datosFormulario.tipo === 'descarga' ? opcionesParking : opcionesBuque} 
                            value={datosFormulario.tipo === 'descarga' ? parkingSeleccionado : buqueSeleccionado} 
                            onChange={(seleccionado) => {
                                const campo = datosFormulario.tipo === 'descarga' ? 'id_parking' : 'id_buque'
                                setDatosFormulario({...datosFormulario, [campo]: seleccionado.value});
                            }} 
                            isDisabled={!modificar} 
                        />
                    </div>
                </div>
                <div className="mt-5 gap-5">
                    <div className="w-[50%]">
                        <label htmlFor="grua_sts_orden">Grúa STS</label>
                        <Select 
                            options={opcionesGruaSTS} 
                            value={gruaSTSSeleccionada} 
                            onChange={(gruaSeleccionada) => {
                                setDatosFormulario({...datosFormulario, [id_grua_sts]: gruaSeleccionada.value, operarios_sts: []});
                            }} 
                            isDisabled={!modificar} 
                            placeholder='Selecciona una grúa STS...'
                        />
                    </div>
                    <div className="w-[50%]">
                        <label htmlFor="grua_sc_orden">Grúa SC</label>
                        <Select 
                            options={opcionesGruaSC} 
                            value={gruaSCSeleccionada} 
                            onChange={(gruaSeleccionada) => {
                                setDatosFormulario({...datosFormulario, [id_grua_sc]: gruaSeleccionada.value, operarios_sc: []});
                            }} 
                            isDisabled={!modificar} 
                            placeholder='Selecciona una grúa SC...'
                        />
                    </div>
                </div>
                <div className="mt-5 gap-5">
                    <div className="w-[50%]">
                        <label htmlFor="operario_sts_orden">Operario STS</label>
                        <Select 
                            options={opcionesOperariosSTS} 
                            value={operariosSTSSeleccionados} 
                            onChange={(operarioSeleccionado) => {
                                setDatosFormulario({...datosFormulario, [id_operario_sts]: operarioSeleccionado.value});
                            }} 
                            isDisabled={!modificar} 
                            placeholder='Selecciona una grúa STS...'
                        />
                    </div>
                    <div className="w-[50%]">
                        <label htmlFor="operario_sc_orden">Operario SC</label>
                        <Select 
                            options={opcionesOperariosSC} 
                            value={operariosSCSeleccionados} 
                            onChange={(operarioSeleccionado) => {
                                setDatosFormulario({...datosFormulario, [id_operario_sc]: operarioSeleccionado.value});
                            }} 
                            isDisabled={!modificar} 
                            placeholder='Selecciona una grúa sc...'
                        />
                    </div>
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

export default DetallesOrden;