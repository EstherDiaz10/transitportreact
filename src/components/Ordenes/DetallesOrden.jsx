import { useState, useEffect } from 'react';
import ordenService from "../../services/ordenes";
import buqueService from "../../services/buques";
import parkingService from "../../services/parkings";
import gruaService from "../../services/gruas";
import operarioService from "../../services/operarios";
import Select from 'react-select';

const DetallesOrden = ({ orden, setOrdenSeleccionada, setOrdenes }) => {

    const [modificar, setModificar] = useState(false);
    const [datosFormulario, setDatosFormulario] = useState({ ...orden });

    const [buques, setBuques] = useState([]);
    const [parkings, setParkings] = useState([]);
    const [contenedoresDisponibles, setContenedoresDisponibles] = useState([]);
    const [gruas, setGruas] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [operarios, setOperarios] = useState([]);

    useEffect(() => {

        buqueService.listadoBuquesConContenedores()
            .then(data => 
                setBuques(data))
            .catch(error => 
                console.error(error));

        parkingService.listadoParkings()
            .then(data => {
                console.log("1. ¿Llegan datos de la API?:", data);
                setParkings(data)
            })
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

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDatosFormulario({ 
            ...orden,
            buque_id: orden.buque?.id || orden.contenedor?.buque_id || null,
            parking_id: orden.parking?.id || orden.contenedor?.parking_id || null,
            grua_sts_id: orden.grua_sts?.id || null,
            grua_sc_id: orden.grua_sc?.id || null,
            operario_sts_id: orden.operario_sts?.id || '',
            operario_sc_id: orden.operario_sc?.id ||'' 
        });
        
        setModificar(false);
        
    }, [orden]);

    /*Obtengo los contenedores del buque y parking asociados a la orden*/
    useEffect(() => {
        let lista = [];
        if (datosFormulario.tipo === 'descarga' && datosFormulario.buque_id) {
            const buque = buques.find((buque) => 
                buque.id === datosFormulario.buque_id
            );
            lista = buque?.contenedores || [];

        } else if (datosFormulario.tipo === 'carga' && datosFormulario.parking_id) {
            const parking = parkings.find((parking) => 
                parking.id === datosFormulario.parking_id
            );
            lista = parking?.contenedor ? [parking.contenedor] : [];
        }
        
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setContenedoresDisponibles(lista);

    }, [datosFormulario.buque_id, datosFormulario.parking_id, datosFormulario.tipo, buques, parkings]);

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

    const objetoGruaSTS = gruas.find((grua) => grua.id === Number(datosFormulario.grua_sts_id));
    const objetoGruaSC = gruas.find((grua) => grua.id === Number(datosFormulario.grua_sc_id));
    
    /*Filtros necesarios para preparar los datos de operarios para lo que espera recibir el Select (value y label)*/
    const opcionesOperariosSTS = objetoGruaSTS?.operarios.map((operario) => ({value: operario.id, label: operario.name})) || [];

    const opcionesOperariosSC = objetoGruaSC?.operarios.map((operario) => ({value: operario.id, label: operario.name})) || [];

    /*Filtros para preparar los datos de buques y parkings para el Select*/
    const opcionesBuque = buques.map((buque) => ({
        value: buque.id, 
        label: `Buque B-${buque.id} - ${buque.nombre}`,
        key: `buque-${buque.id}`
    }));

    const opcionesParkingOcupados = parkings
        .filter((parking) => parking.contenedor !== null)
        .map((parking) => ({
            value: parking.id,
            label: `Parking-${parking.id}`,
            key: parking.id
        }))

    const opcionesParkingLibres = parkings
        .filter((parking) => parking.contenedor === null)
        .map((parking) => ({
            value: parking.id,
            label: `Parking-${parking.id}`,
            key: parking.id
        }))
    
    /*Filtros para preparar los datos de gruas para el Select*/
    const opcionesGruaSTS = gruas
        .filter((grua) => grua.tipo.toLowerCase() === 'sts')
        .map((grua) => ({
            value: grua.id, 
            label: `Grúa STS-${grua.id}`,
            key: `gruasts-${grua.id}`
        }));

    const opcionesGruaSC = gruas
        .filter((grua) => grua.tipo.toLowerCase() === 'sc')
        .map((grua) => ({
            value: grua.id, 
            label: `Grúa SC-${grua.id}`,
            key: `gruasc-${grua.id}`
        }));

    const opcionesContenedores = contenedoresDisponibles?.map(contenedor => ({
        value: contenedor.id,
        label: `Contenedor-${contenedor.id}`,
        key: `contenedor-${contenedor.id}`
    })) || [];

    const buqueSeleccionado = opcionesBuque.find((buque) => buque.value === datosFormulario.buque_id) || null;
    const parkingLibreSeleccionado = opcionesParkingLibres.find((parking) => parking.value === datosFormulario.parking_id) || null;
    const parkingOcupadoSeleccionado = opcionesParkingOcupados.find((parking) => parking.value === datosFormulario.parking_id) || null;
    const gruaSTSSeleccionada = opcionesGruaSTS.find((grua) => grua.value === datosFormulario.grua_sts_id) || null;
    const gruaSCSeleccionada = opcionesGruaSC.find((grua) => grua.value === datosFormulario.grua_sc_id) || null;
    const operarioSTSSeleccionado = opcionesOperariosSTS.find((operario) => operario.value === datosFormulario.operario_sts_id) || null;
    const operarioSCSeleccionado = opcionesOperariosSC.find((operario) => operario.value === datosFormulario.operario_sc_id) || null;
    const contenedorSeleccionado = opcionesContenedores.find((contenedor) => contenedor.value === datosFormulario.contenedor_id) || null;

    const handleEditar = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (modificar) {

            try {
                await ordenService.modificarOrden(orden.id, {
                    ...datosFormulario,
                    tipo: datosFormulario.tipo.toLowerCase(),
                    prioridad: datosFormulario.prioridad.toLowerCase(),
                    estado: datosFormulario.estado.toLowerCase()
                });
                const data = await ordenService.listadoOrdenes();
                setOrdenes(data);
                setOrdenSeleccionada(datosFormulario);
            } catch (error) {
                console.error('Error al guardar orden ', error);
            }
        }

        setModificar(!modificar);
    };


    const cambiarInput = (event) => {
        const { name, value } = event.target;

        if (name === 'tipo') {
            const nuevoTipo = value.toLowerCase();
            setDatosFormulario({
                ...datosFormulario,
                tipo: nuevoTipo,
                buque_id: null,
                parking_id: null,
                contenedor_id: null,
                operario_sts_id: null,
                operario_sc_id: null
            });
        } else {
            setDatosFormulario({ ...datosFormulario, [name]: value });
        }
        
    }

    return (
        <div className="text-[#2A5677] relative pb-23 p-8 md:pb-26 md:p-10 lg:p-0">
            <button onClick={() => setOrdenSeleccionada(null)} className="hidden lg:block lg:fixed top-15 w-10 h-10 flex justify-center align-center cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path></svg>
            </button>
            <button onClick={() => setOrdenSeleccionada(null)} className="lg:hidden absolute top-8 left-8 md:top-11 flex justify-center items-center text-white bg-[#5F84A2] text-xl font-bold hover:text-[#5F84A2] h-9 w-9 rounded-full hover:bg-white/20 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path></svg>
            </button>
            <h1 className="text-center mt-1 md:mt-3 lg:text-left mb-8 text-xl md:text-3xl font-bold text-[#2A5677]">Detalles de la orden</h1>
            <form action="">
                <div className="flex gap-5 w-full mt-5">
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
                <div className="flex gap-5 w-full mt-5">
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
                <div className="flex gap-5 w-full mt-5">
                    <div className="w-[50%]">
                        <label htmlFor="destino_orden">Origen ({datosFormulario.tipo === 'descarga' ? 'Buque' : 'Parking'})</label>
                        <Select 
                            options={datosFormulario.tipo === 'carga' ? opcionesParkingOcupados : opcionesBuque} 
                            value={datosFormulario.tipo === 'carga' ? parkingOcupadoSeleccionado : buqueSeleccionado} 
                            onChange={(seleccionado) => {
                                const campo = datosFormulario.tipo === 'carga' ? 'parking_id' : 'buque_id';
                                setDatosFormulario({...datosFormulario, [campo]: seleccionado ? seleccionado.value : null});
                            }} 
                            isDisabled={!modificar} 
                            placeholder="Origen"
                        />
                    </div>
                    <div className="w-[50%]">
                        <label htmlFor="destino_orden">Destino ({datosFormulario.tipo === 'descarga' ? 'Parking' : 'Buque'})</label>
                        <Select 
                            options={datosFormulario.tipo === 'descarga' ? opcionesParkingLibres : opcionesBuque} 
                            value={datosFormulario.tipo === 'descarga' ? parkingLibreSeleccionado : buqueSeleccionado} 
                            onChange={(seleccionado) => {
                                const campo = datosFormulario.tipo === 'descarga' ? 'parking_id' : 'buque_id'
                                setDatosFormulario({...datosFormulario, [campo]: seleccionado ? seleccionado.value : null});
                            }} 
                            isDisabled={!modificar} 
                            placeholder="Destino"
                        />
                    </div>
                </div>
                <div className="flex gap-5 w-full mt-5">
                    <div className="w-[50%]">
                        <label htmlFor="grua_sts_orden">Grúa STS</label>
                        <Select 
                            options={opcionesGruaSTS} 
                            value={gruaSTSSeleccionada} 
                            onChange={(gruaSeleccionada) => {
                                setDatosFormulario({...datosFormulario, 'grua_sts_id': gruaSeleccionada.value, 'operario_sts_id': null});
                            }} 
                            isDisabled={!modificar} 
                            placeholder='Grúa STS...'
                        />
                    </div>
                    <div className="w-[50%]">
                        <label htmlFor="grua_sc_orden">Grúa SC</label>
                        <Select 
                            options={opcionesGruaSC} 
                            value={gruaSCSeleccionada} 
                            onChange={(gruaSeleccionada) => {
                                setDatosFormulario({...datosFormulario, 'grua_sc_id': gruaSeleccionada.value, 'operario_sc_id': null});
                            }} 
                            isDisabled={!modificar} 
                            placeholder='Grúa SC...'
                        />
                    </div>
                </div>
                <div className="flex gap-5 w-full mt-5">
                    <div className="w-[50%]">
                        <label htmlFor="operario_sts_orden">Operario STS</label>
                        <Select 
                            options={opcionesOperariosSTS} 
                            value={operarioSTSSeleccionado} 
                            onChange={(operarioSeleccionado) => {
                                setDatosFormulario({...datosFormulario, 'operario_sts_id': operarioSeleccionado.value});
                            }} 
                            isDisabled={!modificar} 
                            placeholder='Operario STS'
                        />
                    </div>
                    <div className="w-[50%]">
                        <label htmlFor="operario_sc_orden">Operario SC</label>
                        <Select 
                            options={opcionesOperariosSC} 
                            value={operarioSCSeleccionado} 
                            onChange={(operarioSeleccionado) => {
                                setDatosFormulario({...datosFormulario, 'operario_sc_id': operarioSeleccionado.value});
                            }} 
                            isDisabled={!modificar} 
                            placeholder='Operario SC'
                        />
                    </div>
                </div>
                <div className="w-full mt-5">
                    <label htmlFor="operario_sts_orden">ID Contenedor</label>
                    <Select 
                        options={opcionesContenedores} 
                        value={contenedorSeleccionado} 
                        onChange={(contenedorSeleccionado) => {
                            setDatosFormulario({...datosFormulario, 'contenedor_id': contenedorSeleccionado.value});
                        }} 
                        isDisabled={!modificar} 
                        placeholder='Contenedor a mover...'
                    />
                </div>
                
                <div className="mt-5">
                    <label htmlFor="observaciones_buque">Observaciones</label>
                    <textarea className={`${inputStylePC} mt-3`} onChange={cambiarInput} name="observaciones" id="observaciones_buque" value={datosFormulario.observaciones} rows="2" readOnly={!modificar}>
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