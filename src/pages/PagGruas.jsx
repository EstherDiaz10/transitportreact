import { useState, useEffect } from 'react';
import Listado from '../components/Listado';
import BotonCrear from '../components/BotonCrear';
import FiltradoGrua from '../components/Gruas/FiltradoGrua';
import Busqueda from '../components/Busqueda';
import Modal from '../components/Modal';
import FormAnyadirGrua from '../components/Formularios/FormAnyadirGrua';
import DetallesGrua from '../components/Gruas/DetallesGrua';
import gruaService from '../services/gruas';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const PagGruas = () => {

    const { user } = useContext(AuthContext);
    const [filtrarEstado, setFiltrarEstado] = useState('estado');
    const [filtrarTipo, setFiltrarTipo] = useState('tipo');
    const [inputBuscar, setBuscar] = useState('');
    const [gruas, setGruas] = useState([]);
    const [gruaSeleccionada, setGruaSeleccionada] = useState(null);
    const [crearElemento, setCrearElemento] = useState(false);

    useEffect(()=>{
        gruaService
        .listadoGruas()
        .then(data =>{
            setGruas(data)
        })
    }, [])

    let gruasAMostrar = gruas;

    if(filtrarEstado !== 'estado') {
        gruasAMostrar = gruasAMostrar.filter((grua) => grua.estado.toLowerCase() === filtrarEstado);
    }

    if(filtrarTipo !== 'tipo') {
        gruasAMostrar = gruasAMostrar.filter((grua) => grua.tipo.toLowerCase() === filtrarTipo);
    }

    if(inputBuscar !== '') {
        gruasAMostrar = gruasAMostrar.filter((grua) => {
            let prefijoIdGrua = '';
            let prefijoIdZona = 'ZD-';
            if (grua.tipo === 'sts') {
                prefijoIdGrua = "STS-";
            } else {
                prefijoIdGrua = "SC-";
            }
            const zonaEncontrada = (prefijoIdZona.toLowerCase() + grua.id.toString()).includes(inputBuscar);
            const idEncontrada  = (prefijoIdGrua.toLowerCase() + grua.id.toString()).includes(inputBuscar);

            return zonaEncontrada || idEncontrada;
        });
    }

    const colorEstado = (estado) => {
        switch (estado.toLowerCase()) {
            case 'ocupada':
                return '#925152';
            case 'disponible':
                return '#87A884';
        }
    }

    const estructuraGrid = !gruaSeleccionada 
        ? "grid grid-cols-3 md:grid-cols-[80px_0.7fr_1.3fr_1fr_130px_130px] items-center gap-3 px-4 md:px-0" 
        : "grid grid-cols-3 md:grid-cols-[60px_1.5fr_2.3fr_1fr_60px] items-center gap-5 px-4 md:px-0";

    const columnasGruas = [
        {
            'titulo': 'ID Grua',
            'valor': 'id',
            'prefijo': (grua) => (grua.tipo === 'sts' ? 'STS-' : 'SC-')
        },
        {
            'titulo': 'Operarios asignados',
            'valor': 'operarios',
            'estilos': gruaSeleccionada ? 'hidden truncate' : '',
            'render': (grua) => (
                <div className="flex flex-wrap gap-3">
                    {Array.isArray(grua.operarios) ? (
                        grua.operarios.slice(0,3).map((op, i) => (
                            <span key={i} className="bg-white/50 px-2 py-0.5 rounded">
                                {op.name}
                            </span>
                        ))
                    ) : (
                        <span>{grua.operario}</span>
                    )}
                </div>
            )
        },
        {
            'titulo': 'Zona asignada',
            'valor': 'id_zona',
            'id_ajena': ' ',
            'prefijo': 'ZD-',
            'estilos': 'hidden md:block truncate'
        },
        {
            'titulo': 'Estado',
            'valor': 'estado',
            'estilos': !gruaSeleccionada ? 'px-2' : '',
            'estado': (grua) => (
                <div key={grua.tipo} className={`flex items-center justify-between gap-3 w-full pr-2`}>
                        <p className="truncate text-right">{grua.estado.charAt(0).toUpperCase() + grua.estado.slice(1)}</p>
                        <div style={{backgroundColor: colorEstado(grua.estado)}} className="w-4 h-4 rounded-full"></div>
                </div>
            )
        }
    ]

    const eliminarGrua = async (id) => {

        if(window.confirm('¿Estás seguro de que quieres eliminar esta grúa?')) {
            
            try {

                await gruaService.deleteGrua(id);
                setGruas((gruasActuales) => gruasActuales.filter(grua => grua.id !== id));
        
            } catch (error) {
                console.error('Error al eliminar la grúa ', error)
            }
        }    
    }

    const icono = <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256"><path d="M228.12,17.14a8,8,0,0,0-7.88-.2L102,80H32A16,16,0,0,0,16,96V200a16,16,0,0,0,16,16h88a16,16,0,0,0,16-16V168a7.81,7.81,0,0,0-.34-2.3L113.54,92,216,37.33V160H200v-8a8,8,0,0,0-16,0v8a16,16,0,0,0,16,16h16a16,16,0,0,0,16-16V24A8,8,0,0,0,228.12,17.14ZM98.05,96l19.2,64H64V96ZM48,96v64H32V96ZM32,200h0V176h88v24Z"></path></svg>;
    const ultimoId = (gruas && gruas.length > 0 ? Math.max(...gruas.map(grua => grua.id))+1 : 1);

    return (
        <>
            <h1 className="fixed top-20 text-3xl font-bold text-[#2A5677]">Listado de grúas</h1>
                
                <div className={`${!gruaSeleccionada ? 'w-[94%]' : 'w-[50%]'} pt-5 flex justify-between`}>
                    <FiltradoGrua setFiltrarEstado={setFiltrarEstado} setFiltrarTipo={setFiltrarTipo}/>
                    <Busqueda setBuscar={setBuscar} />
                </div>
                
            <div className={`${gruaSeleccionada ? 'lg:w-[53%]' : 'w-full'}`}>
                {gruas.length > 0 
                    ?  (<Listado elementos={gruasAMostrar} estructuraGrid={estructuraGrid} columnas={columnasGruas} setElementoSeleccionado={setGruaSeleccionada} elementoSeleccionado={gruaSeleccionada} icono={icono} eliminarElemento={eliminarGrua}/>
                    ) : (<p className="flex justify-center mt-10 mb-10 mr-17">No hay grúas para mostrar</p>
                )}
                {user.rol === 'gestor' && (
                    <BotonCrear tipo="grua" setCrearElemento={setCrearElemento} seleccionado={gruaSeleccionada}/>
                )}
                {gruaSeleccionada !== null && (
                    <div className="fixed z-10 left-0 bottom-0 rounded-t-[50px] h-[80%] bg-[#B7D0E1] lg:absolute lg:top-0 right-0 lg:h-full lg:left-auto lg:w-[45%] lg:rounded-t-[0px] lg:rounded-l-[50px] lg:pt-[7%] lg:pl-[5%] lg:pr-[5%]">
                        <DetallesGrua grua={gruaSeleccionada} setGruaSeleccionada={setGruaSeleccionada} setGruas={setGruas}/>
                    </div>
                )}
            </div>

            <Modal modalAbierto={crearElemento} cerrarModal={() => setCrearElemento(false)}>
                <FormAnyadirGrua ultimoId={ultimoId} cerrarModal={() => setCrearElemento(false)} setGruas={setGruas}  />
            </Modal>
        </>
    )
}

export default PagGruas;