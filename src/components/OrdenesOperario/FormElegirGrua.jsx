import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import operarioService from '../../services/operarios';

const FormElegirGrua = ({setGruaSeleccionada}) => {

    const { user } = useContext(AuthContext);
    const [gruasOperario, setGruasOperario] = useState([]);

    useEffect(() => {
        operarioService.listadoGruasOperario(user.id)
            .then(data => {
                console.log('Gruas asignadas a ' + user.name + ':', data);
                setGruasOperario(data);
            });
    }, []);

    return (
        <div>
            <div className="flex justify-center">
                <div className="w-180 h-180 pt-9 pl-10 pr-10 md:pl-18 md:pr-18 md:pt-13 bg-[#B7D0E1] flex flex-col items-center rounded-[50px]">
                    <h1 className="text-center mt-20 md:mt-0 w-[80%] text-2xl md:text-3xl font-bold text-[#2A5677] pb-8">¿En qué grúa vas a trabajar hoy?</h1>
                    <div className="mt-20 flex flex-col md:flex-row justify-center gap-10">
                        {gruasOperario.map((grua) => {
                            const prefijo = grua.tipo === 'sts' ? 'STS-' : 'SC-';
                            return (
                                <button 
                                    key={`Grua ${prefijo}${grua.id}`} 
                                    onClick={() => setGruaSeleccionada(grua)} 
                                    className="p-8 rounded-[20px] bg-[#5F84A2] flex justify-center items-center shadow-md/20 hover:bg-[#DFECF5] cursor-pointer"
                                >
                                    <h1 className="text-2xl">Grúa {prefijo}{grua.id}</h1>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

        </div>
    )

}

export default FormElegirGrua;