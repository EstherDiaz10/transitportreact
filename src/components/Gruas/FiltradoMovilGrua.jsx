const FiltradoMovilGrua = ({setFiltrarEstado, filtrarEstado}) => {

  const opcionesFiltro1 = [
    { label: 'Todas', value: 'tipo' },
    { label: 'STS', value: 'sts' },
    { label: 'SC', value: 'sc' }
  ];

  const opcionesFiltro2 = [
    { label: 'Todas', value: 'estado' },
    { label: 'Disponible', value: 'disponible' },
    { label: 'Ocupada', value: 'ocupada' }
  ];

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-gray-400 font-bold">Tipo de grúa</p>
      <div className="flex flex-wrap gap-2">
        {opcionesFiltro1.map((opcion) => (
          <button
            key={opcion.value}
            onClick={() => setFiltrarEstado(opcion.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filtrarEstado === opcion.value
                ? 'bg-[#5F84A2] text-white shadow-md'
                : 'bg-[#DFECF5] text-[#5F84A2] hover:bg-[#B7D0E1]'
            }`}
          >
            {opcion.label}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-400 font-bold mt-5">Estado de la grúa</p>
      <div className="flex flex-wrap gap-2">
        {opcionesFiltro2.map((opcion) => (
          <button
            key={opcion.value}
            onClick={() => setFiltrarEstado(opcion.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filtrarEstado === opcion.value
                ? 'bg-[#5F84A2] text-white shadow-md'
                : 'bg-[#DFECF5] text-[#5F84A2] hover:bg-[#B7D0E1]'
            }`}
          >
            {opcion.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FiltradoMovilGrua;