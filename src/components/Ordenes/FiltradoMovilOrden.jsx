const FiltradoMovilOrden = ({setFiltrarEstado, setFiltrarPrioridad, setFiltrarTipo, filtrarEstado, filtrarPrioridad, filtrarTipo}) => {

  const opcionesFiltro1 = [
    { label: 'Todos', value: 'estado' },
    { label: 'Pendiente', value: 'pendiente' },
    { label: 'En grúa STS', value: 'en_proceso_sts' },
    { label: 'En zona descarga', value: 'en_zona_desc' },
    { label: 'En grúa SC', value: 'en_proceso_sc' },
    { label: 'Completada', value: 'completada' }
  ];

  const opcionesFiltro2 = [
    { label: 'Todas', value: 'tipo' },
    { label: 'Descarga', value: 'descarga' },
    { label: 'Carga', value: 'carga' }
  ];

   const opcionesFiltro3 = [
    { label: 'Todas', value: 'prioridad' },
    { label: 'Alta', value: 'alta' },
    { label: 'Media', value: 'media' },
    { label: 'Baja', value: 'baja' }
  ];

  return (
    <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-400 font-bold">Estado de la orden</p>
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
        <p className="text-sm text-gray-400 font-bold mt-5">Tipo de orden</p>
        <div className="flex flex-wrap gap-2">
            {opcionesFiltro2.map((opcion) => (
                <button
                    key={opcion.value}
                    onClick={() => setFiltrarTipo(opcion.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filtrarTipo === opcion.value
                        ? 'bg-[#5F84A2] text-white shadow-md'
                        : 'bg-[#DFECF5] text-[#5F84A2] hover:bg-[#B7D0E1]'
                    }`}
                >
                    {opcion.label}
                </button>
            ))}
        </div>
        <p className="text-sm text-gray-400 font-bold mt-5">Prioridad</p>
        <div className="flex flex-wrap gap-2">
            {opcionesFiltro3.map((opcion) => (
                <button
                    key={opcion.value}
                    onClick={() => setFiltrarPrioridad(opcion.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filtrarPrioridad === opcion.value
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

export default FiltradoMovilOrden;