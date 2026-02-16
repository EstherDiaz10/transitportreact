import { useState, useEffect } from 'react';
import contenedorService from "../../services/contenedores";

const DetallesContenedor = ({ contenedor, setContenedorSeleccionado, setContenedores }) => {

    const [modificar, setModificar] = useState(false);

    // Estado inicial seguro (sin undefined)
    const [datosFormulario, setDatosFormulario] = useState({
        id: '',
        num_serie: '',
        companyia: '',
        buque_id: '',
        parking_id: '',
        existe: true,
        observaciones: ''
    });

    useEffect(() => {
        if (contenedor) {
            setDatosFormulario({
                id: contenedor.id ?? '',
                num_serie: contenedor.num_serie ?? '',
                companyia: contenedor.companyia ?? '',
                buque_id: contenedor.buque_id ?? '',
                parking_id: contenedor.parking_id ?? '',
                existe: contenedor.existe ?? true,
                observaciones: contenedor.observaciones ?? ''
            });
            setModificar(false);
        }
    }, [contenedor]);

    const inputStylePC =
        "bg-white p-1 pl-4 rounded-[10px] text-gray-500 w-full disabled:bg-gray-100";

    const prefijo = 'C-';

    const handleEditar = async (event) => {
        event.preventDefault();

        if (modificar) {
            try {

                const datosEnviar = {
                    ...datosFormulario,
                    buque_id:
                        datosFormulario.buque_id === ''
                            ? null
                            : Number(datosFormulario.buque_id),
                    parking_id:
                        datosFormulario.parking_id === ''
                            ? null
                            : Number(datosFormulario.parking_id),
                };

                await contenedorService.modificarContenedor(
                    datosFormulario.id,
                    datosEnviar
                );

                const data = await contenedorService.listadoContenedores();
                setContenedores(data);
                setContenedorSeleccionado(datosEnviar);

            } catch (error) {
                console.error("Error al actualizar:", error);
            }
        }

        setModificar(!modificar);
    };

    const cambiarInput = (event) => {
        const { name, value, type, checked } = event.target;

        let valorFinal = type === 'checkbox' ? checked : value;

        if (name === "existe") {
            valorFinal = value === "true";
        }

        setDatosFormulario({
            ...datosFormulario,
            [name]: valorFinal
        });
    };

    if (!contenedor) return null;

    return (
        <div className="text-[#2A5677] relative pb-23 p-8 md:p-0">

            <button
                onClick={() => setContenedorSeleccionado(null)}
                className="fixed top-15 lg:static w-10 h-10 flex justify-center items-center cursor-pointer mb-4"
            >
                ←
            </button>

            <h1 className="text-center mt-1 lg:text-left mb-8 text-xl md:text-3xl font-bold text-[#2A5677]">
                Detalles del contenedor
            </h1>

            <form onSubmit={(e) => e.preventDefault()}>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label>ID Sistema</label>
                        <input
                            className={`${inputStylePC} mt-2`}
                            type="text"
                            value={`${prefijo}${datosFormulario.id}`}
                            readOnly
                        />
                    </div>

                    <div>
                        <label>Nº Serie</label>
                        <input
                            className={`${inputStylePC} mt-2`}
                            type="text"
                            name="num_serie"
                            value={datosFormulario.num_serie ?? ""}
                            onChange={cambiarInput}
                            readOnly={!modificar}
                        />
                    </div>
                </div>

                <div className="mt-5">
                    <label>Compañía</label>
                    <input
                        className={`${inputStylePC} mt-2`}
                        type="text"
                        name="companyia"
                        value={datosFormulario.companyia ?? ""}
                        onChange={cambiarInput}
                        readOnly={!modificar}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                    <div>
                        <label>ID Buque</label>
                        <input
                            className={`${inputStylePC} mt-2`}
                            type="number"
                            name="buque_id"
                            value={datosFormulario.buque_id ?? ""}
                            onChange={cambiarInput}
                            readOnly={!modificar}
                        />
                    </div>

                    <div>
                        <label>ID Parking</label>
                        <input
                            className={`${inputStylePC} mt-2`}
                            type="number"
                            name="parking_id"
                            value={datosFormulario.parking_id ?? ""}
                            onChange={cambiarInput}
                            readOnly={!modificar}
                        />
                    </div>
                </div>

                <div className="mt-5">
                    <label>Estado / Disponibilidad</label>
                    <select
                        className={`${inputStylePC} mt-2 p-1.5`}
                        name="existe"
                        value={datosFormulario.existe.toString()}
                        onChange={cambiarInput}
                        disabled={!modificar}
                    >
                        <option value="true">Disponible</option>
                        <option value="false">Ocupado / Tránsito</option>
                    </select>
                </div>

                <div className="mt-5">
                    <label>Observaciones</label>
                    <textarea
                        className={`${inputStylePC} mt-2`}
                        name="observaciones"
                        value={datosFormulario.observaciones ?? ""}
                        onChange={cambiarInput}
                        rows="3"
                        readOnly={!modificar}
                    />
                </div>

                <div className="flex justify-center pt-8">
                    <button
                        type="button"
                        onClick={handleEditar}
                        className="bg-[#5F84A2] text-white font-bold p-2 pl-6 pr-6 rounded-[5px]"
                    >
                        {modificar ? "Guardar Cambios" : "Editar Detalles"}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default DetallesContenedor;
