const Filtrado = () => {

  const selectStyles = "bg-[#DFECF5] pl-3 pr-8 rounded-lg border-none outline-none cursor-pointer appearance-none";
  /*pointer-events-none --> permite que si hacemos click en la flecha, abra el select igualmente*/
  return (
    <div className="flex gap-9">
      <h4 className="font-bold">Filtrar por:</h4>
      <div className="relative">
        <select name="tipoBuque" id="buque" className={selectStyles}>
          <option value="tipo">Tipo buque</option>
          <option value="portacontenedores">Portacontenedores</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
        </div>
      </div>
      
      <div className="relative">
        <select name="estado" id="estadoBuque" className={selectStyles}>
          <option value="estado">Estado</option>
          <option value="espera">En espera</option>
          <option value="atracado">Atracado</option>
          <option value="salido">Salido</option>
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

export default Filtrado;