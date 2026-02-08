const FiltradoGrua = ({setFiltrarEstado, setFiltrarTipo}) => {

  const selectStyles = "bg-[#DFECF5] pl-3 rounded-lg border-none outline-none cursor-pointer appearance-none";
  /*pointer-events-none --> permite que si hacemos click en la flecha, abra el select igualmente*/
  return (
    <div className="hidden md:flex gap-9">
      <h4 className="font-bold">Filtrar por:</h4>
      
      <div className="relative">
        <select name="tipo" onChange={(e) => setFiltrarTipo(e.target.value)} id="tipoGrua" className={`${selectStyles} pr-12`}>
        <option value="tipo">Tipo de grúa</option>
          <option value="sts">STS</option>
          <option value="sc">SC</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
        </div>
      </div>

      <div className="relative">
        <select name="estado" onChange={(e) => setFiltrarEstado(e.target.value)} id="estadoGrua" className={`${selectStyles} pr-8`}>
          <option value="estado">Estado</option>
          <option value="disponible">Disponible</option>
          <option value="ocupada">Ocupada</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
        </div>
      </div>
      
    </div>
  )
}

export default FiltradoGrua;