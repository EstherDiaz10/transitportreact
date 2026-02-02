const Busqueda = forwardRef((props, ref) => {

  useImperativeHandle(ref, () => ({

    realizarBusqueda() {
      
    }

  }));

  return (
    <div className="flex bg-[#DFECF5] rounded-[5px] items-center mr-25.5">
      <div className="bg-[#5F84A2] w-8 h-full flex justify-center items-center rounded-[5px] text-white">
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <input onChange={realizarBusqueda} className="bg-[#DFECF5] rounded-[5px] border-none outline-none pl-2 w-full" type="text" />
    </div>
  )
});

export default Busqueda;