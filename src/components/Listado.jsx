const Listado = ({data, onSelect, seleccionado}) => {
    
    const colorEstado = (estado) => {
        switch (estado.toLowerCase()) {
            case 'en espera':
                return '#925152';
            case 'atracado':
                return '#E0AE74';
            case 'salido':
                return '#87A884';
        }
    }

    const botonBase = "bg-[#5F84A2] text-white font-bold rounded-[5px] flex items-center justify-around text-lg hover:bg-[#DFECF5] hover:text-[#5F84A2] hover:border-3 hover:border-[#5F84A2]";
    const botones = `w-[13%] h-10 mt-6 px-4 ${!seleccionado ? 'w-[12%]' : 'w-[5%]'}`;

    return(
    <div>
    <div className={`max-h-137 w-[97%] md:overflow-y-scroll mt-7.5 pr-6 custom-scrollbar`}>
      {data.buques.map((buque) => (
        <div key={buque.id} className="flex items-center justify-between mx-4 bg-[#DFECF5] mb-5 rounded-[10px] h-15 shadow-md/20">
            <div className="flex-[0_0_40px] text-2xl text-center ml-2.5">
                <i className="fa-solid fa-ship"></i>
            </div>
            <div className={"flex-1 flex items-center justify-between mx-4"}>
                <p className="w-35 truncate"><strong>ID Buque: </strong>B-{buque.id}</p>
                {!seleccionado && (
                    <div className="flex gap-40">
                        <p className="w-75 truncate"><strong>Nombre: </strong>{buque.nombre}</p>
                        <p className="w-60 truncate"><strong>Tipo: </strong>{buque.tipo}</p>
                    </div>
                )}
                <div className="flex items-center">
                    <p className="w-40 truncate"><strong>Estado: </strong>{buque.estado}</p>
                    <div style={{backgroundColor: colorEstado(buque.estado), width: '20px', height: '20px', borderRadius: '50%', marginLeft: '10px'}}></div>
                </div>
            </div>
            <div className="h-full flex items-center">
                    <button className={`h-[80%] mr-1.5 ${botonBase} ${!seleccionado ? 'w-30' : 'w-12'}`} onClick={() => onSelect(buque)}>
                        {!seleccionado && (<span>Detalles</span>)}
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 256 256"><path d="M88,96a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H96A8,8,0,0,1,88,96Zm8,40h64a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16Zm32,16H96a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16ZM224,48V156.69A15.86,15.86,0,0,1,219.31,168L168,219.31A15.86,15.86,0,0,1,156.69,224H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM48,208H152V160a8,8,0,0,1,8-8h48V48H48Zm120-40v28.7L196.69,168Z"></path></svg>
                    </button>
            </div>
        </div>
      ))}
    </div>

    <div className="mt-5 flex justify-center flex-wrap w-full gap-20">
        <button className={`${botonBase} ${botones}`} type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg> 
            {!seleccionado && (
                <span>Añadir buque</span>
            )}
        </button>
        <button className={`${botonBase} ${botones}`} type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"></path></svg> 
            {!seleccionado && (
                <span>Eliminar buque</span>
            )}
        </button>
    </div>
    </div>
  )
}

export default Listado;