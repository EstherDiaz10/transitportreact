import buqueService from '../../services/buques';
import { useState } from 'react';

const FormAnyadir = ({ ultimoId, cerrarModal, setBuques }) => {

    const inputStyle = "bg-white p-1 pl-4 rounded-[10px] text-gray-500 w-full";
    const lineStyle = "flex flex-col md:flex-row justify-between gap-6 md:gap-10";
    const columnStyle = "w-full md:w-[50%]";
    const prefijoIdBuque = "B-";

    const [erroresBuque, setErroresBuque] = useState({});

    const [datosNuevoBuque, setDatosNuevoBuque] = useState({
        nombre: '',
        tipo: '',
        capacidad: 0,
        estado: 'en espera',
        observaciones: ''
    });

    const validar = () => {

        let nuevosErrores = {};
        let esValido = true;

        if (!datosNuevoBuque.nombre) {
            nuevosErrores.nombre = "El nombre es obligatorio";
            esValido = false;
        }

        if (!datosNuevoBuque.tipo) {
            nuevosErrores.tipo = "El tipo es obligatorio";
            esValido = false;
        }

        if (!datosNuevoBuque.capacidad || Number(datosNuevoBuque.capacidad) <= 0) {
            nuevosErrores.capacidad = "La capacidad debe ser mayor que 0";
            esValido = false;
        }

        if (!datosNuevoBuque.estado) {
            nuevosErrores.estado = "Debes seleccionar un estado";
            esValido = false;
        }

        setErroresBuque(nuevosErrores);

        return esValido;
    };

    const crearNuevoBuque = async (event) => {
        event.preventDefault();

        const valido = validar();
        if (!valido) return;

        const informacionBuque = {
            ...datosNuevoBuque,
            capacidad: Number(datosNuevoBuque.capacidad)
        };

        try {
            await buqueService.crearBuque(informacionBuque);
            const data = await buqueService.listadoBuques();
            setBuques(data);
        } catch (error) {
            console.error(error);
        }

        cerrarModal();
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setDatosNuevoBuque({
            ...datosNuevoBuque,
            [name]: value
        });

        setErroresBuque({
            ...erroresBuque,
            [name]: ""
        });
    };

    return (
        <div>
            <div className="flex justify-center">
                <div className="w-180 h-180 pt-9 pl-10 pr-10 md:pl-18 md:pr-18 md:pt-13 bg-[#B7D0E1] rounded-[50px]">
                    <h1 className="text-center text-2xl md:text-3xl font-bold text-[#2A5677] pb-8">
                        Añadir buque
                    </h1>

                    <form className="text-[#2A5677]" action="">
                        <div className={lineStyle}>
                            <div className={columnStyle}>
                                <label htmlFor="id_buque">ID buque</label>
                                <input
                                    className={`${inputStyle} mt-3`}
                                    type="text"
                                    id="id_buque"
                                    name="id"
                                    value={`${prefijoIdBuque}${ultimoId}`}
                                    readOnly
                                />
                            </div>

                            <div className={columnStyle}>
                                <label htmlFor="estado_buque">Estado</label>
                                <select
                                    onChange={(event) => handleInput(event)}
                                    className={`${inputStyle} mt-3 p-1.5`}
                                    name="estado"
                                    id="estado_buque"
                                >
                                    <option value="">Selecciona un estado</option>
                                    <option value="en espera">En espera</option>
                                    <option value="atracado">Atracado</option>
                                    <option value="inactivo">Inactivo</option>
                                </select>
                                {erroresBuque.estado && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {erroresBuque.estado}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className={`${lineStyle} mt-8 mb-8`}>
                            <div className={columnStyle}>
                                <label htmlFor="nombre_buque">Nombre</label>
                                <input
                                    onChange={(event) => handleInput(event)}
                                    className={`${inputStyle} mt-3`}
                                    type="text"
                                    id="nombre_buque"
                                    name="nombre"
                                    placeholder="La Perla Negra"
                                />
                                {erroresBuque.nombre && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {erroresBuque.nombre}
                                    </p>
                                )}
                            </div>

                            <div className={columnStyle}>
                                <label htmlFor="tipo_buque">Tipo</label>
                                <input
                                    onChange={(event) => handleInput(event)}
                                    className={`${inputStyle} mt-3`}
                                    type="text"
                                    id="tipo_buque"
                                    name="tipo"
                                    placeholder="Portacontenedores"
                                />
                                {erroresBuque.tipo && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {erroresBuque.tipo}
                                    </p>
                                )}
                            </div>
                        </div>

                        <label htmlFor="capacidad_buque">Capacidad</label>
                        <input
                            onChange={(event) => handleInput(event)}
                            className={`${inputStyle} mt-3`}
                            type="number"
                            id="capacidad_buque"
                            name="capacidad"
                            placeholder="50"
                        />
                        {erroresBuque.capacidad && (
                            <p className="text-red-600 text-sm mt-1">
                                {erroresBuque.capacidad}
                            </p>
                        )}

                        <div className="mt-8">
                            <label htmlFor="observaciones_buque">Observaciones</label>
                            <textarea
                                onChange={(event) => handleInput(event)}
                                className={`${inputStyle} mt-3`}
                                name="observaciones"
                                id="observaciones_buque"
                                rows="4"
                            ></textarea>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={(e) => crearNuevoBuque(e)}
                                className="bg-[#5F84A2] text-white font-bold gap-2 pt-2 pb-2 pr-4 pl-4 rounded-[5px] flex items-center justify-around text-lg hover:bg-[#DFECF5] hover:text-[#5F84A2] hover:border-3 hover:border-[#5F84A2]"
                            >
                                <span>Crear buque</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 256 256">
                                    <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormAnyadir;