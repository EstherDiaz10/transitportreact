const Busqueda = ({setBuscar}) => {

  return (
    <div className="flex bg-[#DFECF5] rounded-[5px] items-center pr-4 md:pr-0 ml-5 md:mr-0.5">
      <div className="bg-[#5F84A2] w-11 h-10 md:w-8 md:h-full flex justify-center items-center rounded-[5px] text-white">
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <input onChange={(e) => setBuscar(e.target.value)} className="bg-[#DFECF5] rounded-[5px] border-none outline-none pl-2 w-full" type="text" />
    </div>
  )
};

export default Busqueda;