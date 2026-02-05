import Botones from "./Botones";
import { useState } from 'react';

const Listado = ({data, onSelect, seleccionado, crearBuque}) => {
    
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

    const botonBase = "bg-[#5F84A2] text-white font-bold rounded-[5px] flex items-center justify-around text-lg hover:bg-[#DFECF5] hover:text-[#5F84A2] hover:border-3 hover:border-[#5F84A2] cursor-pointer";
    const botonEliminarEstilo = "bg-[#925152] text-white rounded-[5px] flex items-center justify-center w-15 ml-1.5 h-12 hover:bg-[#DFECF5] hover:text-[#925152] hover:border-3 hover:border-[#925152] cursor-pointer";
    const estructura = !seleccionado 
        ? "grid grid-cols-3 md:grid-cols-[80px_0.7fr_1.3fr_1fr_130px_130px] items-center gap-3 px-4 md:px-0" 
        : "grid grid-cols-3 md:grid-cols-[60px_1fr_2.3fr_1fr_60px] items-center gap-5 px-4 md:px-0";
    const [botonEliminar, setBotonEliminar] = useState(null);

    const confirmarEliminacionBuque = (nombre) => {
        const eliminar = confirm(`Estás seguro de querer eliminar el buque ${nombre}?`);

        if(eliminar) {
            console.log('Buque eliminado correctamente');
        }
    }

    return(
        <div className="w-full">
            <div className={`${estructura} mt-7 font-bold text-gray-600 text-sm w-[93%]`}>
                <div className="hidden md:block"></div>
                <p className="text-left">ID Buque</p>
                <p className="hidden md:block text-left">Nombre</p>
                {!seleccionado && (
                    <p className="hidden md:block text-left">Tipo</p>
                )}
                <p className={`${!seleccionado ? 'px-2' : ''}`}>Estado</p>
                <div></div>
            </div>
            <div className={`max-h-137 w-[97%] md:overflow-y-scroll mt-3 custom-scrollbar`}>
                
                {data.map((buque) => (
                    <div onMouseEnter={() => setBotonEliminar(buque.id)} onMouseLeave={() => setBotonEliminar(null)} key={buque.id} className={`${estructura} ${buque.id === seleccionado?.id ? 'bg-[#B7D0E1]' : 'bg-[#DFECF5]'} mb-5 rounded-[10px] h-15 shadow-md/20 w-[97%]`}>
                        {botonEliminar === buque.id ? (
                            <button className={`hidden md:flex ${botonEliminarEstilo}`} onClick={() => confirmarEliminacionBuque(buque.nombre)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
                            </button>
                        ) : (
                            <div className="hidden md:block text-2xl text-center">
                                <i className="fa-solid fa-ship"></i>
                            </div>
                        )}

                        {/*Columna 2 -> id buque*/}
                        <p className="font-semibold">B-{buque.id}</p>
                        <p className="hidden md:block truncate">{buque.nombre}</p>
                        {/*Columnas 3 y 4 -> nombre y tipo (al hacer pequeño no aparecen)*/}
                        {!seleccionado && ( 
                            <p className="hidden md:block truncate">{buque.tipo}</p> 
                        )}
                        {/*Columna 5 -> estado buque*/}
                        <div className={`flex items-center justify-between gap-3 w-full pr-2`}>
                            <p className="truncate text-right">{buque.estado.charAt(0).toUpperCase() + buque.estado.slice(1)}</p>
                            <div style={{backgroundColor: colorEstado(buque.estado)}} className="w-4 h-4 rounded-full"></div>
                        </div>
                        {/*Columna 6 -> botón detalles*/}
                        <div className="flex justify-end">
                                <button className={`hidden md:flex h-12 mr-1.5 ${botonBase} ${!seleccionado ? 'w-30' : 'w-12'}`} onClick={() => onSelect(buque)}>
                                    {!seleccionado && (<span>Detalles</span>)}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 256 256"><path d="M88,96a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H96A8,8,0,0,1,88,96Zm8,40h64a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16Zm32,16H96a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16ZM224,48V156.69A15.86,15.86,0,0,1,219.31,168L168,219.31A15.86,15.86,0,0,1,156.69,224H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM48,208H152V160a8,8,0,0,1,8-8h48V48H48Zm120-40v28.7L196.69,168Z"></path></svg>
                                </button>
                                <button className="md:hidden" onClick={() => onSelect(buque)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#5F84A2" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm45.66-93.66a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32-11.32L148.69,136H88a8,8,0,0,1,0-16h60.69l-18.35-18.34a8,8,0,0,1,11.32-11.32Z"></path></svg>
                                </button>
                        </div>
                    </div>
                ))}
            </div>
            <Botones seleccionado={seleccionado} crearBuque={crearBuque}/>
        </div>
  )
}

export default Listado;