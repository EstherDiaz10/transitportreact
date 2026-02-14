const Busqueda = ({setBuscar}) => {

  return (
    <div className="flex bg-[#DFECF5] rounded-[5px] items-center pr-4 ml-5 md:w-70">
      <div className="bg-[#5F84A2] w-11 h-10 md:w-10 md:h-10 lg:w-9 lg:h-8 flex justify-center items-center rounded-[5px] text-white">
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <input onChange={(e) => setBuscar(e.target.value)} className="bg-[#DFECF5] rounded-[5px] border-none outline-none pl-2 w-full" type="text" />
    </div>
  )
};

export default Busqueda;