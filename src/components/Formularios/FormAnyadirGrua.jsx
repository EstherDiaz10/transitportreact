import gruaService from '../../services/gruas';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import operarioService from '../../services/operarios';

const FormAnyadir = ({ultimoId, cerrarModal}) => {

    const inputStyle = "bg-white p-1 pl-4 rounded-[10px] text-gray-500 w-full";
    const lineStyle = "flex justify-between gap-10";
    const columnStyle = "flex flex-wrap w-[50%]";
    const { user } = useContext(AuthContext);
    const [datosNuevaGrua, setDatosNuevaGrua] = useState({
        tipo: '',
        gestor: user.id,
        estado: 'en espera',
        operario: '',
        observaciones: ''
    });
    
    const zonas = [
        'ZD-1',
        'ZD-2',
        'ZD-3',
        'ZD-4',
        'ZD-5'
    ];

    const crearNuevaGrua = () => {
        gruaService.crearGrua(datosNuevaGrua);
        cerrarModal();
    }

    const obtenerOperarios = () => {
        operarioService.listadoOperarios()
    }

    const handleInput = (event) => {
        const {name, value} = event.target;
        setDatosNuevaGrua({...datosNuevaGrua, [name]: value});
    }

    return (
        <div>
            <div className="flex justify-center">
                <div className="w-180 h-180 pl-18 pr-18 pt-13 bg-[#B7D0E1] rounded-[50px]">
                    <h1 className="text-3xl font-bold text-[#2A5677] pb-8">Añadir grúa</h1>
                    <form className="text-[#2A5677]" action="">
                        <div className={lineStyle}>
                            <div className={columnStyle}>
                                <label htmlFor="id_grua">ID grúa</label>
                                <input className={`${inputStyle} mt-3`} type="text" id="id_buque" name="id" value={`${datosNuevaGrua.tipo === 'sts' ? 'STS-' : 'SC-'}${ultimoId}`} readOnly/>
                            </div>
                            <div className={columnStyle}>
                                <label htmlFor="tipo_grua">Tipo de grúa</label>
                                <select onChange={(event) => handleInput(event)} className={`${inputStyle} mt-3`} name="tipo" id="tipo_grua">
                                    <option className="p-3" value="sts">STS</option>
                                    <option className="p-3" value="sc">SC</option>
                                </select>
                            </div>
                        </div>
                        <div className={lineStyle}>
                            <div className={columnStyle}>
                                <label htmlFor="zona_grua">Zona asignada</label>
                                <select onChange={(event) => handleInput(event)} className={`${inputStyle} mt-3`} name="zona" id="zona_grua">
                                    {zonas.map((zona) =>
                                        <option key={zona} className="p-3" value={zona}>{zona}</option>, {/*aqui en el futuro deben ir zonas reales de la BD, no un array. Además, la key será su id, etc.*/}
                                    )}
                                </select>
                            </div>
                            <div className={columnStyle}>
                                <label htmlFor="estado_grua">Estado</label>
                                <select onChange={(event) => handleInput(event)} className={`${inputStyle} mt-3 p-1.5`} name="estado" id="estado_grua">
                                    <option className="p-3" value="disponible">Disponible</option>
                                    <option className="p-3" value="ocupada">Ocupada</option>
                                </select>
                            </div>
                        </div>
                        <div className={columnStyle}>
                            <label htmlFor="operario_grua">Operador asignado</label>
                            <select onChange={(event) => handleInput(event)} className={`${inputStyle} mt-3`} name="operario" id="operario_grua">
                                {operarios.map((zona) =>
                                    <option key={zona} className="p-3" value={zona}>{zona}</option>, {/*aqui en el futuro deben ir zonas reales de la BD, no un array. Además, la key será su id, etc.*/}
                                )}
                            </select>
                        </div>
                
                        
                        
                        
                        
                        <div className="mt-8">
                            <label htmlFor="observaciones_buque">Observaciones</label>
                            <textarea onChange={(event) => handleInput(event)} className={`${inputStyle} mt-3`} name="observaciones" id="observaciones_grua" rows="4"></textarea>
                        </div>
                        <div className="mt-6 flex justify-center">
                            <button onClick={crearNuevaGrua} className="bg-[#5F84A2] text-white font-bold gap-2 pt-2 pb-2 pr-4 pl-4 rounded-[5px] flex items-center justify-around text-lg hover:bg-[#DFECF5] hover:text-[#5F84A2] hover:border-3 hover:border-[#5F84A2]">
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

export default FormAnyadir;