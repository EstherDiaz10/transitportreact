import { useState, useEffect } from 'react';
import Listado from '../components/Listado';
import BotonCrear from '../components/BotonCrear';
import Filtrado from '../components/Buques/Filtrado';
import Busqueda from '../components/Busqueda';
import Detalles from '../components/Buques/Detalles';
import Modal from '../components/Modal';
import FormAnyadirBuque from '../components/Formularios/FormAnyadirBuque';
import buqueService from '../services/buques';

const PagBuques = () => {
    
    const [selectFiltrado, setFiltrarEstado] = useState('estado');
    const [inputBuscar, setBuscar] = useState('');
    const [buques, setBuques] = useState([]);
    const [buqueSeleccionado, setBuqueSeleccionado] = useState(null);
    const [crearElemento, setCrearElemento] = useState(false);
    const [mostrarFiltrosMovil, setMostrarFiltrosMovil] = useState(false);

    useEffect(()=>{
        buqueService
        .listadoBuques()
        .then(data =>{
            setBuques(data)
        })
    }, [])

    let buquesAMostrar = buques;

    if(selectFiltrado !== 'estado') {
        buquesAMostrar = buquesAMostrar.filter((buque) => buque.estado.toLowerCase() === selectFiltrado.toLowerCase())
    }

    if(inputBuscar !== '') {
        buquesAMostrar = buquesAMostrar.filter((buque) => {
        const prefijoIdBuque = "B-";
        const nombreEncontrado = buque.nombre.toLowerCase().includes(inputBuscar.toLowerCase());
        const idEncontrada  = (prefijoIdBuque.toLowerCase() + buque.id.toString()).includes(inputBuscar);

        return nombreEncontrado || idEncontrada;
        });
    }

    const colorEstado = (estado) => {
        switch (estado.toLowerCase()) {
            case 'en espera':
                return '#925152';
            case 'atracado':
                return '#E0AE74';
            case 'inactivo':
                return '#87A884';
        }
    }

    const estructuraGrid = !buqueSeleccionado 
        ? "grid grid-cols-[1fr_1fr_0.4fr] lg:grid-cols-[80px_0.7fr_1.3fr_1fr_130px_130px] md:grid-cols-[80px_0.7fr_1fr_130px_130px] items-center gap-3 px-4 md:px-0" 
        : "grid grid-cols-[1fr_1fr_auto] lg:grid-cols-[60px_1fr_2.3fr_1fr_60px] md:grid-cols-[60px_1fr_2.3fr_1fr_60px] items-center gap-5 px-4 md:px-0";

    const columnasBuques = [
        {
            'titulo': 'ID Buque',
            'valor': 'id',
            'prefijo': 'B-',
        },
        {
            'titulo': 'Nombre',
            'valor': 'nombre',
            'estilos': 'hidden md:block truncate'
        },
        {
            'titulo': 'Tipo',
            'valor': 'tipo',
            'estilos': buqueSeleccionado ? 'hidden truncate' : 'hidden lg:block'
        },
        {
            'titulo': 'Estado',
            'valor': 'estado',
            'estilos': !buqueSeleccionado ? 'px-2' : '',
            'estado': (buque) => (
                <div key={buque.nombre} className={`flex items-center justify-between gap-3 w-full pr-2`}>
                        <p className="truncate text-right">{buque.estado.charAt(0).toUpperCase() + buque.estado.slice(1)}</p>
                        <div style={{backgroundColor: colorEstado(buque.estado)}} className="w-4 h-4 rounded-full"></div>
                </div>
            )
        }
    ]

    const icono = <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256"><path d="M221.06,110.59,208,106.23V56a16,16,0,0,0-16-16H136V24a8,8,0,0,0-16,0V40H64A16,16,0,0,0,48,56v50.23l-13.06,4.36A16,16,0,0,0,24,125.77V152c0,61.54,97.89,86.72,102.06,87.76a8,8,0,0,0,3.88,0C134.11,238.72,232,213.54,232,152V125.77A16,16,0,0,0,221.06,110.59ZM64,56H192v44.9L130.53,80.41a8,8,0,0,0-5.06,0L64,100.9Zm152,96c0,24.91-23.68,43-43.55,53.83A228.13,228.13,0,0,1,128,223.72,226.85,226.85,0,0,1,83.81,206C47.6,186.35,40,165.79,40,152V125.77L120,99.1V168a8,8,0,0,0,16,0V99.1l80,26.67Z"></path></svg>;
    const ultimoId = (buques && buques.length > 0 ? Math.max(...buques.map(buque => buque.id))+1 : null);

    return (
        <div className="pb-23 lg:pb-0">
            <h1 className="mt-14 md:mt-0 ml-5 md:ml-0 text-3xl font-bold text-[#2A5677] md:absolute md:top-20">Listado de buques</h1>
           
           <div className="flex items-center mt-4 md:mt-0 gap-1">
                <div className={`w-full ${!buqueSeleccionado ? 'md:w-[94%]' : 'md:w-[50%]'} md:pt-8 flex justify-between`}>
                    <Filtrado setFiltrarEstado={setFiltrarEstado}/>
                    <Busqueda setBuscar={setBuscar} />
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
            
            <div className={`w-full ${buqueSeleccionado ? 'lg:w-[53%]' : 'lg:w-full'}`}>
                 {buques.length > 0 
                    ? ( <div className="ml-5 mr-3 md:mr-0 md:ml-0">
                            <Listado 
                                elementos={buquesAMostrar} 
                                estructuraGrid={estructuraGrid} 
                                columnas={columnasBuques} 
                                setElementoSeleccionado={setBuqueSeleccionado} 
                                elementoSeleccionado={buqueSeleccionado} 
                                icono={icono}
                            />
                        </div>
                    ) : (<p className="flex justify-center mt-10 mb-10 mr-17">No hay buques para mostrar</p>
                 )}
                <BotonCrear tipo="buque" setCrearElemento={setCrearElemento} seleccionado={buqueSeleccionado}/>
                {buqueSeleccionado !== null && (
                    <div className="absolute z-20 left-0 right-0 top-45 rounded-t-[30px] bg-[#B7D0E1] lg:absolute lg:top-0 lg:right-0 lg:h-full lg:left-auto lg:w-[45%] lg:rounded-t-[0px] lg:rounded-l-[50px] lg:pt-[7%] lg:pl-[5%] lg:pr-[5%]">
                        <Detalles buque={buqueSeleccionado} setBuqueSeleccionado={setBuqueSeleccionado} setBuques={setBuques}/>
                    </div>
                )}
            </div>

            <Modal modalAbierto={crearElemento} cerrarModal={() => setCrearElemento(false)}>
                <FormAnyadirBuque ultimoId={ultimoId} cerrarModal={() => setCrearElemento(false)} setBuques={setBuques} />
            </Modal>
        </div>
    )
}

export default PagBuques;