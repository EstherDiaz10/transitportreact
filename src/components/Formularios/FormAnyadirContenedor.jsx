import contenedorService from '../../services/contenedores';
import buquesService from '../../services/buques';
import { useEffect, useState } from 'react';


const FormAnyadirContenedor = ({ ultimoId, cerrarModal, setContenedores }) => {


    const inputStyle = "bg-white p-1 pl-4 rounded-[10px] text-gray-500 w-full";
    const lineStyle = "flex justify-between gap-10";
    const columnStyle = "flex flex-wrap w-[50%]";
    const prefijoIdContenedor = "C-";
    const [buques, setBuques] = useState([]);

     useEffect(() => {
            buquesService.listadoBuques()
                .then(data => { 
                    setBuques(Object.values(data));
                })
        }, []);


    const [datosNuevoContenedor, setDatosNuevoContenedor] = useState({
        num_serie: '',
        companyia: '',
        existe: true,
        observaciones: '',
        buque_id: null,
        parking_id: null
    });


    const crearNuevoContenedor = async (e) => {
        e.preventDefault();


        try {
            const nuevo = await contenedorService.crearContenedor(datosNuevoContenedor);


            setContenedores(prev => [...prev, nuevo]);


            cerrarModal();
        } catch (error) {
            console.error("Error creando contenedor", error);
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
    };


    return (
        <div>
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
                                    className={`${inputStyle} mt-3`}
                                    name="num_serie"
                                    required
                                />
                            </div>
                        </div>


                        <div className={`${lineStyle} mt-8 mb-8`}>
                            <div className={columnStyle}>
                                <label>Compañía</label>
                                <input
                                    onChange={handleInput}
                                    className={`${inputStyle} mt-3`}
                                    name="companyia"
                                    required
                                />
                            </div>


                            <div className={columnStyle}>
                                <label>Disponibilidad</label>
                                <select
                                    onChange={handleInput}
                                    className={`${inputStyle} mt-3 p-1.5`}
                                    name="existe"
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
                                    className={`${inputStyle} mt-3 p-1.5`}
                                    name="buque_id" 
                                    defaultValue=""
                                >
                                    <option value="" disabled>Seleccione un ID</option>

                                    {buques?.map((buque) => (
                                        <option key={buque.id} value={buque.nombre}>
                                            {buque.nombre}  
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <div className={columnStyle}>
                                <label>ID Parking</label>
                                <input
                                    onChange={handleInput}
                                    className={`${inputStyle} mt-3`}
                                    type="number"
                                    name="parking_id"
                                />
                            </div>
                        </div>


                        <div className="mt-8">
                            <label>Observaciones</label>
                            <textarea
                                onChange={handleInput}
                                className={`${inputStyle} mt-3`}
                                name="observaciones"
                                rows="3"
                            ></textarea>
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
        </div>
    );
};


export default FormAnyadirContenedor;
