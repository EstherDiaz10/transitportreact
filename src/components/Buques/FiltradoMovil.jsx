const FiltradoMovil = ({setFiltrarEstado, filtrarEstado}) => {

  const opciones = [
    { label: 'Todos', value: 'estado' },
    { label: 'En espera', value: 'en espera' },
    { label: 'Atracado', value: 'atracado' },
    { label: 'Inactivo', value: 'inactivo' }
  ];
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-gray-400 font-bold">Estado del Buque</p>
      <div className="flex flex-wrap gap-2">
        {opciones.map((opcion) => (
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

export default FiltradoMovil;