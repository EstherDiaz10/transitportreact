import { useState, useEffect } from 'react';
import Listado from '../components/Listado';
import BotonCrear from '../components/BotonCrear';
import FiltradoOrden from '../components/Ordenes/FiltradoOrden';
import FiltradoMovilOrden from '../components/Ordenes/FiltradoMovilOrden';
import Busqueda from '../components/Busqueda';
import DetallesOrden from '../components/Ordenes/DetallesOrden';
import Modal from '../components/Modal';
import ordenesService from '../services/ordenes';
import FormAnyadirOrden from '../components/Formularios/FormAnyadirOrden';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';

const PagOrdenes = () => {

    const { user } = useContext(AuthContext);
    /* Filtros y búsqueda */
    const [filtrarEstado, setFiltrarEstado] = useState('estado');
    const [filtrarPrioridad, setFiltrarPrioridad] = useState('prioridad');
    const [filtrarTipo, setFiltrarTipo] = useState('tipo');
    const [inputBuscar, setBuscar] = useState('');
    
    const [ordenes, setOrdenes] = useState([]);
    const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
    const [crearElemento, setCrearElemento] = useState(false);
    const [mostrarFiltrosMovil, setMostrarFiltrosMovil] = useState(false);
    
    useEffect(()=>{
        ordenesService
        .listadoOrdenes()
        .then(data =>{
            setOrdenes(data)
        })
    }, [])

    let ordenesAMostrar = ordenes;

    if(filtrarEstado !== 'estado') {
        ordenesAMostrar = ordenesAMostrar.filter((orden) => orden.estado.toLowerCase() === filtrarEstado.toLowerCase());
    }

    if(filtrarPrioridad !== 'prioridad') {
        ordenesAMostrar = ordenesAMostrar.filter((orden) => orden.prioridad.toLowerCase() === filtrarPrioridad.toLowerCase());
    }

    if(filtrarTipo !== 'tipo') {
        ordenesAMostrar = ordenesAMostrar.filter((orden) => orden.tipo.toLowerCase() === filtrarTipo.toLowerCase());
    }

    if(inputBuscar !== '') {
        ordenesAMostrar = ordenesAMostrar.filter((orden) => {
            const prefijoOrden = orden.tipo === 'carga' ? 'OC-' : 'OD-';
            const idEncontrada  = (prefijoOrden.toLowerCase() + orden.id.toString()).includes(inputBuscar);

            return idEncontrada;
        });
    }

    const colorEstado = (estado) => {
        switch (estado.toLowerCase()) {
            case 'pendiente':
                return '#8B0000';
            case 'en_proceso_sts':
                return '#FFD700';
            case 'en_zona_desc':
                return '#1E90FF';
            case 'en_proceso_sc':
                return '#FF8C00';
            case 'completada':
                return '#28A745';
        }
    }

    const colorPrioridad = (prioridad) => {
        switch (prioridad.toLowerCase()) {
            case 'alta':
                return '#925152';
            case 'media':
                return '#E0AE74';
            case 'baja':
                return '#87A884';
        }
    }

    const estructuraGrid = !ordenSeleccionada 
        ? "grid grid-cols-[1fr_1fr_0.4fr] lg:grid-cols-[80px_0.7fr_1.3fr_1fr_180px_130px] md:grid-cols-[80px_0.7fr_1fr_180px_130px] items-center gap-3 px-4 md:px-0" 
        : "grid grid-cols-[1fr_1fr_auto] lg:grid-cols-[60px_1fr_2.3fr_1fr_60px] md:grid-cols-[60px_1fr_2.3fr_1fr_60px] items-center gap-5 px-4 md:px-0";

    const columnasOrdenes = [
        {
            'titulo': 'ID Orden',
            'valor': 'id',
            'prefijo': (orden) => (orden.tipo === 'carga' ? 'OC-' : 'OD-')
        },
        {
            'titulo': 'Tipo de orden',
            'valor': 'tipo',
            'estilos': ordenSeleccionada ? 'hidden truncate' : 'hidden lg:block'
        },
        {
            'titulo': 'Prioridad',
            'valor': 'prioridad',
            'estilos': !ordenSeleccionada ? 'px-2 hidden md:flex' : 'hidden md:flex',
            'prioridad': (orden) => (
                <div className={`flex items-center gap-3 w-full hidden md:flex`}>
                        <p className="w-16 truncate text-left">{orden.prioridad}</p>
                        <div style={{border: `3px solid ${colorPrioridad(orden.prioridad)}`}} className="w-4 h-4 rounded-full"></div>
                </div>
            )
        },
        {
            'titulo': 'Estado',
            'valor': 'estado',
            'estilos': !ordenSeleccionada ? 'px-2' : '',
            'estado': (orden) => (
                <div className={`flex items-center justify-between gap-3 w-full pr-2`}>
                        <p className="truncate text-right">{orden.estado}</p>
                        <div style={{backgroundColor: colorEstado(orden.estado)}} className="w-4 h-4 rounded-full"></div>
                </div>
            )
        },
    ]

    const eliminarOrden = async (id) => {
    
        const resultado = await Swal.fire({
            title: '¿Estás seguro?',
            text: ' Vas a eliminar la orden',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if(resultado.isConfirmed) {
            
            try {

                await ordenesService.eliminarOrden(id);
                const data = await ordenesService.listadoOrdenes();
                setOrdenes(data);

                Swal.fire(
                    '¡Eliminada!',
                    'La orden ha sido eliminada correctamente.',
                    'success'
                );
        
            } catch (error) {
                console.error('Error al eliminar la orden ', error)
                Swal.fire(
                    'Error',
                    'Hubo un problema al eliminar la orden.',
                    'error'
                );
            }
        }    
    }

    const icono = <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,58.34l-32-32a8,8,0,0,0-11.32,0l-96,96A8,8,0,0,0,88,128v32a8,8,0,0,0,8,8h32a8,8,0,0,0,5.66-2.34l96-96A8,8,0,0,0,229.66,58.34ZM124.69,152H104V131.31l64-64L188.69,88ZM200,76.69,179.31,56,192,43.31,212.69,64ZM224,128v80a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h80a8,8,0,0,1,0,16H48V208H208V128a8,8,0,0,1,16,0Z"></path></svg>;
    const ultimoId = (ordenes && ordenes.length > 0 ? Math.max(...ordenes.map(orden => orden.id))+1 : 1);

    return (
        <div className="pb-23 lg:pb-0 md:ml-7">
            <h1 className="mt-14 md:mt-0 ml-5 md:ml-0 text-3xl font-bold text-[#2A5677] md:absolute md:top-20">Listado de órdenes</h1>
           
           <div className="flex items-center mt-4 md:mt-0 gap-1">
                <div className={`w-full md:w-[97%] ${!ordenSeleccionada ? 'lg:w-[94%] flex justify-between' : 'lg:w-[50%] flex-col gap-2'} md:pt-8`}>
                    <FiltradoOrden setFiltrarEstado={setFiltrarEstado} setFiltrarPrioridad={setFiltrarPrioridad} setFiltrarTipo={setFiltrarTipo}/>
                    <Busqueda setBuscar={setBuscar} elementoSeleccionado={ordenSeleccionada} />
                </div>
                <div className="md:hidden flex items-center w-[20%]">
                    <button
                        onClick={() => setMostrarFiltrosMovil(!mostrarFiltrosMovil)}
                        className="w-10 h-10 bg-[#DFECF5] p-1 ml-1 rounded-[5px] font-bold flex justify-center items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#5F84A2" viewBox="0 0 256 256"><path d="M136,120v96a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm64,72a8,8,0,0,0-8,8v16a8,8,0,0,0,16,0V200A8,8,0,0,0,200,192Zm24-32H208V40a8,8,0,0,0-16,0V160H176a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16ZM56,160a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V168A8,8,0,0,0,56,160Zm24-32H64V40a8,8,0,0,0-16,0v88H32a8,8,0,0,0,0,16H80a8,8,0,0,0,0-16Zm72-48H136V40a8,8,0,0,0-16,0V80H104a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Z"></path></svg>
                    </button>
                </div>
            </div>
            {mostrarFiltrosMovil && (
                <div className="absolute right-7 top-26 mt-2 w-64 bg-white rounded-[10px] shadow-xl border border-[#DFECF5] z-50 p-4">
                    <h3 className="text-[#5F84A2] font-bold mb-3 border-b border-[#DFECF5] pb-2">Opciones de Filtro</h3>
                    
                    <div className="flex flex-col gap-4">
                        <FiltradoMovilOrden setFiltrarEstado={setFiltrarEstado} setFiltrarPrioridad={setFiltrarPrioridad} setFiltrarTipo={setFiltrarTipo}/>
                        <button onClick={() => setMostrarFiltrosMovil(false)} className="bg-[#5F84A2] text-white py-2 rounded-[5px] mt-2 font-bold hover:opacity-90">
                            Cerrar
                        </button>
                    </div>
                </div>
            )}    
            <div className={`w-full ${ordenSeleccionada ? 'lg:w-[53%]' : 'w-full'}`}>
                {ordenes.length > 0 
                    ?  ( <div className="ml-5 mr-3 md:mr-0 md:ml-0">
                            <Listado 
                                elementos={ordenesAMostrar} 
                                estructuraGrid={estructuraGrid} 
                                columnas={columnasOrdenes} 
                                setElementoSeleccionado={setOrdenSeleccionada} 
                                elementoSeleccionado={ordenSeleccionada} 
                                icono={icono}
                                eliminarElemento={eliminarOrden}
                            />
                        </div>
                    ) : (<p className="flex justify-center mt-10 mb-10 mr-17">No hay órdenes para mostrar</p>
                )}
                {user.rol === 'administrativo' && (
                    <BotonCrear tipo="orden" setCrearElemento={setCrearElemento} seleccionado={ordenSeleccionada}/>
                )}
                {ordenSeleccionada !== null && (
                    <div className="absolute z-20 left-0 right-0 top-45 md:top-58 rounded-t-[30px] bg-[#B7D0E1] lg:absolute lg:top-0 lg:right-0 lg:h-full lg:left-auto lg:w-[45%] lg:rounded-t-[0px] lg:rounded-l-[50px] lg:pt-[7%] lg:pl-[5%] lg:pr-[5%]">
                        <DetallesOrden orden={ordenSeleccionada} setOrdenSeleccionada={setOrdenSeleccionada} setOrdenes={setOrdenes}/>
                    </div>
                )}
            </div>

            <Modal modalAbierto={crearElemento} cerrarModal={() => setCrearElemento(false)}>
                <FormAnyadirOrden ultimoId={ultimoId} cerrarModal={() => setCrearElemento(false)} setOrdenes={setOrdenes} />
            </Modal>
        </div>
    )
}

export default PagOrdenes;