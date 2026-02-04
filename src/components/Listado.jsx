import Botones from "./Botones";
import { useState } from 'react';

const Listado = ({data, onSelect, seleccionado, crearBuque, eliminarBuque, setEliminarBuque}) => {
    
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
    const botonBase = "bg-[#5F84A2] text-white font-bold rounded-[5px] flex items-center justify-around text-lg hover:bg-[#DFECF5] hover:text-[#5F84A2] hover:border-3 hover:border-[#5F84A2]";
    const estructura = !seleccionado ? "grid grid-cols-[3px_80px_0.7fr_1.3fr_1fr_130px_130px] items-center gap-3" : "grid grid-cols-[3px_60px_1fr_2.3fr_1fr_60px] items-center gap-5";
    const [buqueEliminar, setBuqueEliminar] = useState(null);

    return(
        <div className="w-full">
            <div className={`${estructura} mt-7 font-bold text-gray-600 text-sm w-[93%]`}>
                <div></div>
                <div></div>
                <p className="text-left">ID Buque</p>
                <p className="text-left">Nombre</p>
                {!seleccionado && (
                    <>
                    
                    <p className="text-left">Tipo</p>
                    </>
                )}
                <p className={`${!seleccionado ? 'px-2' : ''}`}>Estado</p>
                <div></div>
            </div>
            <div className={`max-h-137 w-[97%] md:overflow-y-scroll mt-3 custom-scrollbar`}>
                
                {data.map((buque) => (
                    <div key={buque.id} className={`${estructura} ${buque.id === seleccionado?.id ? 'bg-[#B7D0E1]' : 'bg-[#DFECF5]'} mb-5 rounded-[10px] h-15 shadow-md/20 w-[97%]`}>
                        {/*Columna 1 -> icono buque*/}
                        {eliminarBuque ? (
                            <div className="pl-5">
                                <form>
                                    <input type="checkbox" id="checkboxEliminar" onClick={() => setBuqueEliminar(buque)}/>
                                </form>
                            </div>
                        ) : (
                            <div></div>
                        )}
                        <div className="text-2xl text-center">
                            <i className="fa-solid fa-ship"></i>
                        </div>
                        {/*Columna 2 -> id buque*/}
                        <p className="font-semibold">B-{buque.id}</p>
                        <p className="truncate">{buque.nombre}</p>
                        {/*Columnas 3 y 4 -> nombre y tipo (al hacer pequeño no aparecen)*/}
                        {!seleccionado && ( 
                            <p className="truncate">{buque.tipo}</p> 
                        )}
                        {/*Columna 5 -> estado buque*/}
                        <div className={`flex items-center justify-between gap-3 w-full pr-2`}>
                            <p className="truncate text-right">{buque.estado}</p>
                            <div style={{backgroundColor: colorEstado(buque.estado)}} className="w-4 h-4 rounded-full"></div>
                        </div>
                        {/*Columna 6 -> botón detalles*/}
                        <div className="flex justify-end">
                                <button className={`h-12 mr-1.5 ${botonBase} ${!seleccionado ? 'w-30' : 'w-12'}`} onClick={() => onSelect(buque)}>
                                    {!seleccionado && (<span>Detalles</span>)}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 256 256"><path d="M88,96a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H96A8,8,0,0,1,88,96Zm8,40h64a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16Zm32,16H96a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16ZM224,48V156.69A15.86,15.86,0,0,1,219.31,168L168,219.31A15.86,15.86,0,0,1,156.69,224H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM48,208H152V160a8,8,0,0,1,8-8h48V48H48Zm120-40v28.7L196.69,168Z"></path></svg>
                                </button>
                        </div>
                    </div>
                ))}
            </div>
            <Botones seleccionado={seleccionado} crearBuque={crearBuque} setEliminarBuque={setEliminarBuque}/>
        </div>
  )
}

export default Listado;