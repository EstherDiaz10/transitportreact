const Botones = ({crearBuque, seleccionado}) => {

    const botonBase = "bg-[#5F84A2] text-white font-bold rounded-[5px] flex items-center justify-around text-lg hover:bg-[#DFECF5] hover:text-[#5F84A2] hover:border-3 hover:border-[#5F84A2]";
    const botones = `h-10 mt-6 px-4 ${!seleccionado ? 'w-[12%]' : 'w-[23%]'}`;
    
    return (
        <div className="mt-5 flex justify-center flex-wrap w-full gap-20">
            <button onClick={() => crearBuque(true)} className={`${botonBase} ${botones}`} type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg> 
                <span>Añadir buque</span>
            </button>
        </div>
    )
}

export default Botones;