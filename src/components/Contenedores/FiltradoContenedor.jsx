const FiltradoContenedor = ({ setFiltrarEstado }) => {
  const selectStyles =
    "bg-[#DFECF5] pl-3 py-1 rounded-lg border-none outline-none cursor-pointer appearance-none text-[#2A5677]";


  return (
    <div className="hidden md:flex gap-9 items-center">
      <h4 className="font-bold text-[#2A5677]">Filtrar por:</h4>


      <div className="relative">
        <select
          name="estado"
          onChange={(e) => setFiltrarEstado(e.target.value)}
          id="estadoContenedor"
          className={`${selectStyles} pr-10`}
        >
          <option value="">Todas</option>
          <option value="Parking">Parking</option>
          <option value="Buque">Buque</option>
          <option value="Zona descarga">Zona descarga</option>
          <option value="Patio">Patio</option>
        </select>


        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#2A5677]">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};


export default FiltradoContenedor;


