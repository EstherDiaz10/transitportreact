import { useState } from 'react';

const Listado = ({elementos, estructuraGrid, columnas, setElementoSeleccionado, elementoSeleccionado, icono}) => {

    const botonBase = "bg-[#5F84A2] text-white font-bold rounded-[5px] flex items-center justify-around text-lg hover:bg-[#DFECF5] hover:text-[#5F84A2] hover:border-3 hover:border-[#5F84A2] cursor-pointer";
    const botonEliminarEstilo = "bg-[#925152] text-white rounded-[5px] flex items-center justify-center w-15 ml-1.5 h-12 hover:bg-[#DFECF5] hover:text-[#925152] hover:border-3 hover:border-[#925152] cursor-pointer";
    const [botonEliminar, setBotonEliminar] = useState(null);

    const [paginaActual, setPaginaActual] = useState(1);
    const registrosPorPagina = 7;
    const ultimoIndice = paginaActual * registrosPorPagina;
    const primerIndice = ultimoIndice - registrosPorPagina;
    const registrosActuales = elementos.slice(primerIndice, ultimoIndice);
    const totalPaginas = Math.ceil(elementos.length / registrosPorPagina);

    const cambiarPagina = (numero) => setPaginaActual(numero);

    const opcionesPaginas = [];
    for (let i = 1; i <= totalPaginas; i++) {
        
        if (i === 1 || i === totalPaginas || i % 10 === 0) {
            opcionesPaginas.push(
                <option key={i} value={i}>
                    Página {i}
                </option>
            );
        }
    }

    const confirmarEliminacionBuque = (nombre) => {
        const eliminar = confirm(`Estás seguro de querer eliminar el buque ${nombre}?`);

        if(eliminar) {
            console.log('Buque eliminado correctamente');
        }
    }

    return(
        <div className="w-full">
            <div className={`${estructuraGrid} mt-7 font-bold text-gray-600 text-sm w-[93%]`}>
                <div className="hidden md:block"></div>
                {columnas.map((columna) => (
                    <p key={columna.valor} className={columna.estilos}>{columna.titulo}</p>
                ))}
                <div></div>
            </div>

            <div className={`max-h-137 w-[97%] mt-3`}>
                {registrosActuales.map((elemento) => (
                    <div onMouseEnter={() => setBotonEliminar(elemento.id)} onMouseLeave={() => setBotonEliminar(null)} key={elemento.id} className={`${estructuraGrid} ${elemento.id === elementoSeleccionado?.id ? 'bg-[#B7D0E1]' : 'bg-[#DFECF5]'} mb-5 rounded-[10px] h-15 shadow-md/20 w-[97%]`}>
                        {botonEliminar === elemento.id ? (
                            <button className={`hidden md:flex ${botonEliminarEstilo}`} onClick={() => confirmarEliminacionBuque(elemento.nombre)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
                            </button>
                        ) : (
                            <div className="hidden md:block pl-6">
                                {icono}
                            </div>
                        )}

                        {columnas.map((columna, indice) => {

                            if (columna.render) {
                                return <div key={indice} className={columna.estilos}>{columna.render(elemento)}</div>;
                            }
                            const prefijo = typeof columna.prefijo === 'function' ? columna.prefijo(elemento) : columna.prefijo;

                            if (columna.valor === 'id' || columna.id_ajena) {
                                return <p key={indice} className={columna.estilos}>{prefijo}{elemento[columna.valor]}</p>
                            } else if (columna.valor === 'estado') {
                                return columna.estado(elemento)
                            } else if (columna.valor === 'prioridad') {
                                return columna.prioridad(elemento)
                            }else {
                                return <p key={indice} className={columna.estilos}>{elemento[columna.valor]}</p>
                            }       
                        })}

                        <div className="flex justify-end">
                                <button className={`hidden md:flex h-12 mr-1.5 ${botonBase} ${!elementoSeleccionado ? 'w-30' : 'w-12'}`} onClick={() => setElementoSeleccionado(elemento)}>
                                    {!elementoSeleccionado && (<span>Detalles</span>)}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 256 256"><path d="M88,96a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H96A8,8,0,0,1,88,96Zm8,40h64a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16Zm32,16H96a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16ZM224,48V156.69A15.86,15.86,0,0,1,219.31,168L168,219.31A15.86,15.86,0,0,1,156.69,224H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM48,208H152V160a8,8,0,0,1,8-8h48V48H48Zm120-40v28.7L196.69,168Z"></path></svg>
                                </button>
                                <button className="md:hidden" onClick={() => setElementoSeleccionado(elemento)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#5F84A2" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm45.66-93.66a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32-11.32L148.69,136H88a8,8,0,0,1,0-16h60.69l-18.35-18.34a8,8,0,0,1,11.32-11.32Z"></path></svg>
                                </button>
                        </div>
                    </div>
                ))}

            </div>
            
            <div className="flex justify-between items-center mt-4 w-[94%]">
                <div className="relative">
                    <select name="pagina" onChange={(e) => cambiarPagina(Number(e.target.value))} id="idPagina" className="bg-[#DFECF5] pl-3 pr-12 rounded-lg border-none outline-none cursor-pointer appearance-none">
                    {opcionesPaginas}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                    disabled={paginaActual === 1}
                    onClick={() => cambiarPagina(paginaActual - 1)}
                    className="p-2 disabled:opacity-30 text-white cursor-pointer w-10 h-10 bg-[#5F84A2] rounded-[5px]"
                    >
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    
                    <p>Pagina {paginaActual} de {totalPaginas}</p>

                    <button 
                        disabled={paginaActual === totalPaginas}
                        onClick={() => cambiarPagina(paginaActual + 1)}
                        className="p-2 disabled:opacity-30 text-white cursor-pointer w-10 h-10 bg-[#5F84A2] rounded-[5px]"
                    >
                    <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>

        </div>
  )
}

export default Listado;