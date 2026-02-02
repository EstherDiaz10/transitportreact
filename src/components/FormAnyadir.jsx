const FormAnyadir = () => {

    const inputStyle = "bg-white p-1 pl-4 rounded-[10px] text-gray-500 w-full";
    const lineStyle = "flex justify-between gap-10";
    const columnStyle = "flex flex-wrap w-[50%]";

    return (
        <div className="w-180 h-180 pl-18 pr-18 pt-13 bg-[#B7D0E1] rounded-[50px]">
            <h1 className="text-3xl font-bold text-[#2A5677] pb-8">Añadir buque</h1>
            <form className="text-[#2A5677]" action="">
                <div className={lineStyle}>
                    <div className={columnStyle}>
                        <label htmlFor="id_buque">ID buque</label>
                        <input className={`${inputStyle} mt-3`} type="text" id="id_buque" name="id" value="B-" readOnly/>
                    </div>
                    <div className={columnStyle}>
                        <label htmlFor="estado_buque">Estado</label>
                        <select className={`${inputStyle} mt-3 p-1.5`} name="estado" id="estado_buque">
                            <option className="p-3" value="espera">En espera</option>
                            <option className="p-3" value="atracado">Atracado</option>
                            <option className="p-3" value="inactivo">Inactivo</option>
                        </select>
                    </div>
                </div>
                <div className={`${lineStyle} mt-8 mb-8`}>
                    <div className={columnStyle}>
                        <label htmlFor="nombre_buque">Nombre</label>
                        <input className={`${inputStyle} mt-3`} type="text" id="nombre_buque" name="nombre" value="" placeholder="La Perla Negra"/>
                    </div>
                    <div className={columnStyle}>
                        <label htmlFor="tipo_buque">Tipo</label>
                        <input className={`${inputStyle} mt-3`} type="text" id="tipo_buque" name="tipo" value="" placeholder="Portacontenedores"/>
                    </div>
                </div>
                <label htmlFor="capacidad_buque">Capacidad</label>
                <input className={`${inputStyle} mt-3`} type="number" id="capacidad_buque" name="capacidad" value="" placeholder="50"/>
                <div className="mt-8">
                    <label htmlFor="observaciones_buque">Observaciones</label>
                    <textarea className={`${inputStyle} mt-3`} name="observaciones" id="observaciones_buque" value="" rows="4"></textarea>
                </div>
                
            </form>
        </div>
    )

}

export default FormAnyadir;