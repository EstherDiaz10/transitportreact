import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import operarioService from '../../services/operarios';
import zonasService from '../../services/zonas';
import gruasService from '../../services/gruas';
import MultiSelect from '../MultiSelect';

const FormAnyadirGrua = ({ultimoId, cerrarModal, setGruas}) => {

    const inputStyle = "bg-white p-1 pl-4 rounded-[10px] text-gray-500 w-full";
    const lineStyle = "flex justify-between gap-10";
    const columnStyle = "flex flex-wrap w-[50%]";
    const { user } = useContext(AuthContext);
    const [operarios, setOperarios] = useState([]);
    const [zonas, setZonas] = useState([]);
    const [datosNuevaGrua, setDatosNuevaGrua] = useState({
        tipo: 'sc',
        id_gestor: user.id,
        estado: 'disponible',
        id_zona: '',
        operarios: [],
        observaciones: null
    });

    useEffect(() => {
        operarioService.listadoOperarios()
            .then(data => {
                const opciones = data.map(operario => ({
                    value: operario.id,    
                    label: operario.name   
                }));
                setOperarios(opciones);
            });

        zonasService.listadoZonas()
            .then(data => {
                setZonas(Object.values(data));
            })
    }, []);
    
    const crearNuevaGrua = async (event) => {
        event.preventDefault();
        
        const {operarios: operariosSeleccionados, ...gruaData} = datosNuevaGrua;

        const informacionGrua = {
            ...gruaData,
            operarios: operariosSeleccionados.map(operario => operario.value)
        };
        
        try {

            await gruasService.crearGrua(informacionGrua);
            const data = await gruasService.listadoGruas();
            setGruas(data);
    
            cerrarModal();
        } catch (error) {
            console.error(error);
        }
        
    }

    const handleInput = (event) => {
        const {name, value} = event.target;
        setDatosNuevaGrua({
            ...datosNuevaGrua, 
            [name]: value
        });
    }

    const handleSelectOperarios = (selected) => {
        setDatosNuevaGrua({ ...datosNuevaGrua, operarios: selected });
    }

    const prefijoZona = 'ZD-';

    return (
        <div>
            <div className="flex justify-center">
                <div className="w-180 h-180 pt-9 pl-10 pr-10 md:pl-18 md:pr-18 md:pt-13 bg-[#B7D0E1] rounded-[50px]">
                    <h1 className="text-center text-2xl md:text-3xl font-bold text-[#2A5677] pb-8">Añadir grúa</h1>
                    <form className="text-[#2A5677]" action="">
                        <div className={lineStyle}>
                            <div className={columnStyle}>
                                <label htmlFor="id_grua">ID grúa</label>
                                <input className={`${inputStyle} mt-3`} type="text" id="id_buque" name="id" value={`${datosNuevaGrua.tipo.toUpperCase()}-${ultimoId}`} readOnly/>
                            </div>
                            <div className={columnStyle}>
                                <label htmlFor="tipo_grua">Tipo de grúa</label>
                                <select onChange={(event) => handleInput(event)} className={`${inputStyle} mt-3`} name="tipo" id="tipo_grua">
                                    <option value="">Selecciona un tipo</option>
                                    <option className="p-3" value="sc">SC</option>
                                    <option className="p-3" value="sts">STS</option>
                                </select>
                            </div>
                        </div>
                        <div className={`${lineStyle} mt-8`}>
                            <div className={columnStyle}>
                                <label htmlFor="zona_grua">Zona asignada</label>
                                <select onChange={(event) => handleInput(event)} className={`${inputStyle} mt-3`} name="id_zona" id="zona_grua">
                                    <option value="">Selecciona una zona</option>
                                    {zonas.map((zona) =>
                                        <option key={zona.id} className="p-3" value={zona.id}>{prefijoZona}{zona.id}</option>
                                    )}
                                </select>
                            </div>
                            <div className={columnStyle}>
                                <label htmlFor="estado_grua">Estado</label>
                                <select onChange={(event) => handleInput(event)} className={`${inputStyle} mt-3 p-1.5`} name="estado" id="estado_grua">
                                    <option value="">Selecciona un estado</option>
                                    <option className="p-3" value="disponible">Disponible</option>
                                    <option className="p-3" value="ocupada">Ocupada</option>
                                </select>
                            </div>
                        </div>
                        <div className='mt-8'>
                            <label className="mb-3 block" htmlFor="operarios_grua">Operarios asignados</label>
                            <MultiSelect options={operarios} value={datosNuevaGrua.operarios} onChange={handleSelectOperarios} />
                        </div>
                        <div className="mt-8">
                            <label htmlFor="observaciones_grua">Observaciones</label>
                            <textarea onChange={(event) => handleInput(event)} className={`${inputStyle} mt-3`} name="observaciones" id="observaciones_grua" rows="4"></textarea>
                        </div>
                        <div className="mt-6 flex justify-center">
                            <button onClick={(e) => crearNuevaGrua(e)} className="bg-[#5F84A2] text-white font-bold gap-2 pt-2 pb-2 pr-4 pl-4 rounded-[5px] flex items-center justify-around text-lg hover:bg-[#DFECF5] hover:text-[#5F84A2] hover:border-3 hover:border-[#5F84A2]">
                                <span>Crear</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )

}

export default FormAnyadirGrua;