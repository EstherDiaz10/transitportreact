import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import ordenService from "../../services/ordenes";
import buqueService from "../../services/buques";
import parkingService from "../../services/parkings";
import gruaService from "../../services/gruas";
import Select from '../Select';

const FormAnyadirOrden = ({ cerrarModal, setOrdenes }) => {

    const inputStyle = "bg-white p-1 pl-4 rounded-[10px] text-gray-500 w-full";
    const lineStyle = "flex justify-between gap-10";
    const columnStyle = "flex flex-wrap w-[50%] text-";
    
    const { user } = useContext(AuthContext);

    const [buques, setBuques] = useState([]);
    const [parkings, setParkings] = useState([]);
    const [gruas, setGruas] = useState([]);
    const [contenedoresDisponibles, setContenedoresDisponibles] = useState([]);

    const [datosNuevaOrden, setDatosNuevaOrden] = useState({
        tipo: 'descarga',
        prioridad: 'media',
        estado: 'pendiente',
        administrativo_id: user.id,
        buque_id: null,
        parking_id: null,
        contenedor_id: null,
        grua_sts_id: null,
        grua_sc_id: null,
        operario_sts_id: null,
        operario_sc_id: null,
        observaciones: null
    });

    useEffect(() => {
        buqueService.listadoBuquesConContenedores()
            .then(data => setBuques(data));

        parkingService.listadoParkings()
            .then(data => setParkings(data));

        gruaService.listadoGruas()
            .then(data => setGruas(data));
    }, []);

    /*Obtengo los contenedores del buque y parking asociados a la orden*/
    useEffect(() => {
        let lista = [];
        if (datosNuevaOrden.tipo === 'descarga' && datosNuevaOrden.buque_id) {
            const buque = buques.find(buque => buque.id === datosNuevaOrden.buque_id);
            lista = buque.contenedores || [];
        } else if (datosNuevaOrden.tipo === 'carga' && datosNuevaOrden.parking_id) {
            const parking = parkings.find(parking => parking.id === datosNuevaOrden.parking_id);
            lista = [parking.contenedor] || [];
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setContenedoresDisponibles(lista);
    }, [datosNuevaOrden.buque_id, datosNuevaOrden.parking_id, datosNuevaOrden.tipo, buques, parkings]);

    
    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name === 'tipo') {
            
            setDatosNuevaOrden({
                ...datosNuevaOrden,
                tipo: value,
                buque_id: null,
                parking_id: null,
                contenedor_id: null
            });
        } else {
            setDatosNuevaOrden({ ...datosNuevaOrden, [name]: value });
        }
    };

    const crearOrden = async (e) => {
        e.preventDefault();
        try {
            console.log(datosNuevaOrden);
            await ordenService.crearOrden(datosNuevaOrden);
            const data = await ordenService.listadoOrdenes();
            console.log(data);
            setOrdenes(data);
            cerrarModal();
        } catch (error) {
            console.error("Error al crear la orden:", error);
        }
    };

    // Preparación de opciones para selects
    const opcionesBuque = buques.map(buque => ({ 
        value: buque.id, 
        label: `Buque: ${buque.nombre}`,
        key: `B-${buque.id}` 
    }));

    const opcionesParkingLibres = parkings
        .filter(parking => parking.estado === 'libre')
        .map(parking => ({ 
            value: parking.id,
            label: `P-${parking.id} (Libre)`,
            key: `P-libre-${parking.id}`
        }));

    const opcionesParkingOcupados = parkings
        .filter(parking => parking.estado === 'ocupado')
        .map(parking => ({ 
            value: parking.id, 
            label: `P-${parking.id} (Ocupado)`,
            key: `P-ocupado-${parking.id}` 
        }));
    
    const opcionesGruaSTS = gruas
        .filter(grua => grua.tipo.toLowerCase() === 'sts')
        .map(grua => ({ 
            value: grua.id, 
            label: `STS-${grua.id}`,
            key: `STS-${grua.id}`
        }));

    const opcionesGruaSC = gruas
        .filter(grua => grua.tipo.toLowerCase() === 'sc')
        .map(grua => ({ 
            value: grua.id, 
            label: `SC-${grua.id}`,
            key: `SC-${grua.id}`
        }));

    const opcOperariosSTS = gruas
        .find(grua => grua.id === datosNuevaOrden.grua_sts_id)?.operarios
        .map(operario => ({ 
            value: operario.id, 
            label: operario.name,
            key: `OperarioSTS-${operario.id}`
        })) || [];

    const opcOperariosSC = gruas
        .find(grua => grua.id === datosNuevaOrden.grua_sc_id)?.operarios
        .map(operario => ({ 
            value: operario.id, 
            label: operario.name,
            key: `OperarioSC-${operario.id}`
        })) || [];

    const opcionesContenedores = contenedoresDisponibles.map(contenedor => ({ 
        value: contenedor.id, 
        label: `Contenedor: ${contenedor.num_serie || contenedor.id}`,
        key:  `Contenedor-${contenedor.id}`
    }));

    return (
        <div className="flex justify-center">
            <div className="w-300 h-220 pt-9 pl-10 pr-10 md:pl-18 md:pr-18 md:pt-13 bg-[#B7D0E1] rounded-[50px]">
                <h1 className="text-center text-2xl md:text-3xl font-bold text-[#2A5677] pb-8">Añadir Nueva Orden</h1>
                <form onSubmit={crearOrden} className="text-[#2A5677]">

                    <div className={lineStyle}>
                        <div className={columnStyle}>
                            <label>Tipo de orden</label>
                            <select name="tipo" className={`${inputStyle} mt-3 p-2`} onChange={handleInput} value={datosNuevaOrden.tipo}>
                                <option value="">Selecciona un tipo</option>
                                <option value="descarga">Descarga</option>
                                <option value="carga">Carga</option>
                            </select>
                        </div>
                        <div className={columnStyle}>
                            <label>Prioridad</label>
                            <select name="prioridad" className={`${inputStyle} mt-3 p-2`} onChange={handleInput} value={datosNuevaOrden.prioridad}>
                                <option value="">Selecciona una prioridad</option>
                                <option value="baja">Baja</option>
                                <option value="media">Media</option>
                                <option value="alta">Alta</option>
                            </select>
                        </div>
                    </div>

                    <div className={`${lineStyle} mt-6`}>
                        <div className={columnStyle}>
                            <label>Origen ({datosNuevaOrden.tipo === 'descarga' ? 'Buque' : 'Parking'})</label>
                            <div className="w-full mt-3">
                                <Select 
                                    options={datosNuevaOrden.tipo === 'descarga' ? opcionesBuque : opcionesParkingOcupados}
                                    onChange={(seleccionado) => setDatosNuevaOrden({...datosNuevaOrden, [datosNuevaOrden.tipo === 'descarga' ? 'buque_id' : 'parking_id']: seleccionado?.value})}
                                    placeholder="Seleccionar origen..."
                                />
                            </div>
                        </div>
                        <div className={columnStyle}>
                            <label>Destino ({datosNuevaOrden.tipo === 'descarga' ? 'Parking' : 'Buque'})</label>
                            <div className="w-full mt-3">
                                <Select 
                                    options={datosNuevaOrden.tipo === 'descarga' ? opcionesParkingLibres : opcionesBuque}
                                    onChange={(seleccionado) => setDatosNuevaOrden({...datosNuevaOrden, [datosNuevaOrden.tipo === 'descarga' ? 'parking_id' : 'buque_id']: seleccionado?.value})}
                                    placeholder="Seleccionar destino..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <label>Contenedor</label>
                        <div className="mt-3">
                            <Select 
                                options={opcionesContenedores}
                                onChange={(contenedorSeleccionado) => setDatosNuevaOrden({...datosNuevaOrden, contenedor_id: contenedorSeleccionado?.value})}
                                placeholder="Seleccionar contenedor disponible..."
                            />
                        </div>
                    </div>

                    {/* GRUAS */}
                    <div className={`${lineStyle} mt-6`}>
                        <div className={columnStyle}>
                            <label>Grúa STS</label>
                            <div className="w-full mt-3">
                                <Select 
                                    options={opcionesGruaSTS}
                                    onChange={(gruaSeleccionada) => setDatosNuevaOrden({...datosNuevaOrden, grua_sts_id: gruaSeleccionada?.value, operario_sts_id: null})}
                                />
                            </div>
                        </div>
                        <div className={columnStyle}>
                            <label>Grúa SC</label>
                            <div className="w-full mt-3">
                                <Select 
                                    options={opcionesGruaSC}
                                    onChange={(gruaSeleccionada) => setDatosNuevaOrden({...datosNuevaOrden, grua_sc_id: gruaSeleccionada?.value, operario_sc_id: null})}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`${lineStyle} mt-6`}>
                        <div className={columnStyle}>
                            <label>Operario STS</label>
                            <div className="w-full mt-3">
                                <Select 
                                    options={opcOperariosSTS}
                                    onChange={(operarioSeleccionado) => setDatosNuevaOrden({...datosNuevaOrden, operario_sts_id: operarioSeleccionado?.value})}
                                />
                            </div>
                        </div>
                        <div className={columnStyle}>
                            <label>Operario SC</label>
                            <div className="w-full mt-3">
                                <Select 
                                    options={opcOperariosSC}
                                    onChange={(operarioSeleccionado) => setDatosNuevaOrden({...datosNuevaOrden, operario_sc_id: operarioSeleccionado?.value})}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <label>Observaciones</label>
                        <textarea name="observaciones" className={`${inputStyle} mt-3`} rows="3" onChange={handleInput} value={datosNuevaOrden.observaciones}></textarea>
                    </div>
                    <div className="mt-5 flex justify-center">
                        <button type="submit" className="bg-[#5F84A2] text-white font-bold gap-2 pt-2 pb-2 pr-6 pl-6 rounded-[5px] flex items-center hover:bg-[#DFECF5] hover:text-[#5F84A2] border-2 border-transparent hover:border-[#5F84A2] transition-all">
                            <span>Crear orden</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormAnyadirOrden;