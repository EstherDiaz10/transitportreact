import contenedorService from '../../services/contenedores';
import buquesService from '../../services/buques';
import { useEffect, useState } from 'react';

const FormAnyadirContenedor = ({ ultimoId, cerrarModal, setContenedores }) => {

    const inputStyle = "bg-white p-1 pl-4 rounded-[10px] text-gray-500 w-full";
    const lineStyle = "flex justify-between gap-10";
    const columnStyle = "flex flex-wrap w-[50%]";
    const prefijoIdContenedor = "C-";

    const [buques, setBuques] = useState([]);
    const [erroresContenedor, setErroresContenedor] = useState({});

    //VALIDACIONES 
    const validar =()=>{
        let esValido = true; 
        let nuevosErrores = {};

        if (!datosNuevoContenedor.num_serie) {
            nuevosErrores.num_serie = "El número de serie es obligatorio";
            esValido = false; 
        }

        if (!datosNuevoContenedor.companyia) {
            nuevosErrores.companyia = "La compañía es obligatoria";
            esValido = false; 
        }

        if (!datosNuevoContenedor.buque_id) {
            nuevosErrores.buque_id = "Debe asignarse a un buque inicialmente";
            esValido = false; 
        }

        if (datosNuevoContenedor.parking_id !== null && datosNuevoContenedor.parking_id<0) {
            nuevosErrores.parking_id = "El ID del parking no puede ser negativo";
            esValido = false; 
        }

        setErroresContenedor(nuevosErrores);

        return esValido; 

    }

    useEffect(() => {
        buquesService.listadoBuques()
            .then(data => {
                setBuques(Object.values(data));
            })
            .catch(error => console.error(error));
    }, []);

    const [datosNuevoContenedor, setDatosNuevoContenedor] = useState({
        num_serie: '',
        companyia: '',
        existe: true,
        observaciones: '',
        buque_id: null,
        parking_id: null
    });

    const crearNuevoContenedor = async (event) => {
        event.preventDefault();
        //validar 
        const valido = validar(); 
        if (!valido) {
            return
        }
        try {
            await contenedorService.crearContenedor(datosNuevoContenedor);
            const data = await contenedorService.listadoContenedores();
            setContenedores(data);
            cerrarModal();
        } catch (error) {
            console.error(error);
        }
    };

    const handleInput = (event) => {
        const { name, value } = event.target;

        let valorFinal = value;

        if (name === "existe") {
            valorFinal = value === "true";
        }

        if (name === "parking_id" || name === "buque_id") {
            valorFinal = value === "" ? null : Number(value);
        }

        setDatosNuevoContenedor({
            ...datosNuevoContenedor,
            [name]: valorFinal
        });

        //limpiar los errores cuando ya no los hay
        setErroresContenedor({
            ...erroresContenedor,
            [name]:""
        });
    };

    const inputConError = (campo)=> `${inputStyle} mt-3 ${erroresContenedor[campo] ? "border-2 border-red-500" : ""}`;

     return (
        <div className="flex justify-center">
            <div className="w-180 h-180 pt-9 pl-10 pr-10 md:pl-18 md:pr-18 md:pt-13 bg-[#B7D0E1] rounded-[50px]">
                <h1 className="text-center text-2xl md:text-3xl font-bold text-[#2A5677] pb-8">
                    Añadir contenedor
                </h1>

                <form className="text-[#2A5677]" onSubmit={crearNuevoContenedor}>

                    <div className={lineStyle}>
                        <div className={columnStyle}>
                            <label>ID Sistema</label>
                            <input
                                className={`${inputStyle} mt-3`}
                                value={`${prefijoIdContenedor}${ultimoId}`}
                                readOnly
                            />
                        </div>

                        <div className={columnStyle}>
                            <label>Número de Serie</label>
                            <input
                                onChange={handleInput}
                                className={inputConError("num_serie")}
                                name="num_serie"
                            />
                            {erroresContenedor.num_serie && (
                                <p className="text-red-600 text-sm mt-1">
                                    {erroresContenedor.num_serie}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className={`${lineStyle} mt-8 mb-8`}>
                        <div className={columnStyle}>
                            <label>Compañía</label>
                            <input
                                onChange={handleInput}
                                className={inputConError("companyia")}
                                name="companyia"
                            />
                            {erroresContenedor.companyia && (
                                <p className="text-red-600 text-sm mt-1">
                                    {erroresContenedor.companyia}
                                </p>
                            )}
                        </div>

                        <div className={columnStyle}>
                            <label>Disponibilidad</label>
                            <select
                                onChange={handleInput}
                                className={`${inputStyle} mt-3 p-1.5`}
                                name="existe"
                                defaultValue="true"
                            >
                                <option value="true">Disponible</option>
                                <option value="false">No disponible</option>
                            </select>
                        </div>
                    </div>

                    <div className={lineStyle}>
                        <div className={columnStyle}>
                            <label>ID Buque</label>
                            <select
                                onChange={handleInput}
                                className={inputConError("buque_id")}
                                name="buque_id"
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Seleccione un ID
                                </option>
                                {buques.map((buque) => (
                                    <option key={buque.id} value={buque.id}>
                                        {buque.id}
                                    </option>
                                ))}
                            </select>
                            {erroresContenedor.buque_id && (
                                <p className="text-red-600 text-sm mt-1">
                                    {erroresContenedor.buque_id}
                                </p>
                            )}
                        </div>

                        <div className={columnStyle}>
                            <label>ID Parking</label>
                            <input
                                type="number"
                                onChange={handleInput}
                                className={inputConError("parking_id")}
                                name="parking_id"
                            />
                            {erroresContenedor.parking_id && (
                                <p className="text-red-600 text-sm mt-1">
                                    {erroresContenedor.parking_id}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-8">
                        <label>Observaciones</label>
                        <textarea
                            onChange={handleInput}
                            className={`${inputStyle} mt-3`}
                            name="observaciones"
                            rows="3"
                        />
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            type="submit"
                            className="bg-[#5F84A2] text-white font-bold pt-2 pb-2 pr-4 pl-4 rounded-[5px] text-lg hover:bg-[#DFECF5] hover:text-[#5F84A2] hover:border-3 hover:border-[#5F84A2]"
                        >
                            Crear Contenedor
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};


export default FormAnyadirContenedor;
