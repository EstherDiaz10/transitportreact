const FiltradoMovilCont = ({setFiltrarEstado, filtrarEstado}) => {

  const opciones = [
    { label: 'Todas', value: '' },
    { label: 'Parking', value: 'Parking' },
    { label: 'Buque', value: 'Buque' },
    { label: 'A zona descarga', value: 'De camino a zona descarga'},
    { label: 'De camino al patio', value: 'De camino al patio'},
    { label: 'Descargando del buque', value: 'De camino al patio'},
    { label: 'Cargando al buque', value: 'Cargando al buque'},
    { label: 'Zona descarga', value: 'Zona descarga' },
    { label: 'Patio', value: 'Patio' }
  ];
  return (
    <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-400 font-bold">Ubicación del contenedor</p>
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

export default FiltradoMovilCont;