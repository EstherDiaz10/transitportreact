import { useEffect, useState } from "react";
import patioService from "../services/patio";

export default function PagPatio() {
    const [patio, setPatio] = useState({
        zonas_descarga: [],
        sts: [],
        sc: [],
        patio: []
    });

    useEffect(() => {
        patioService
            .cargar()
            .then(data => {
                console.log(data);
                setPatio(data);
            });
    }, []);

    const colorOcupado = "bg-[#8b3a3a]"; 
    const colorDisponible = "bg-[#7fa47f]"; 

    return (
        <div className="bg-[#DFECF5] p-[30px] rounded-[30px]">
            
            {/* BUQUE */}
            <div className="h-[120px] bg-slate-300 flex items-center justify-center mb-[30px]">
                <strong className="tracking-widest">BUQUES</strong>
            </div>

            {/* STS */}
            <div className="flex justify-around mb-5">
                {patio.sts.map((sts, index) => (
                    <div
                        key={sts.id}
                        className={`w-[70px] height-[70px] rounded-full flex items-center justify-center text-[12px] text-white aspect-square
                            ${sts.estado !== 'disponible' ? colorOcupado : colorDisponible}`}
                    >
                        STS-{index + 1}
                    </div>
                ))}
            </div>

            {/* Zonas de Descarga */}
            <div className="flex justify-around mb-[25px]">
                {patio.zonas_descarga.map((z, index) => (
                    <div
                        key={z.codigo}
                        className={`w-[120px] h-[35px] flex items-center justify-center text-[12px] text-white
                            ${z.estado !== 'disponible' ? colorOcupado : colorDisponible}`}
                    >
                        {z.codigo}
                    </div>
                ))}
            </div>

            {/* SC */}
            <div className="flex justify-center gap-[10px] mb-[30px]">
                {patio.sc.map((sc, index) => (
                    <div
                        key={sc.id}
                        className={`w-10 h-10 flex items-center justify-center text-[10px] text-white
                            ${sc.estado !== 'disponible' ? colorOcupado : colorDisponible}`}
                    >
                        SC-{index + 1}
                    </div>
                ))}
            </div>

            {/* Contenedor Blanco del Patio */}
            <div className="bg-white p-5 rounded-[30px]">
                <div className="grid grid-cols-4 gap-[25px]">
                    {patio.patio.map((zona, zonaIndex) => (
                        <div key={zona.zona}>
                            <div className="text-[12px] mb-[6px] font-semibold text-slate-600">
                                Zona Patio - {zonaIndex + 1}
                            </div>

                            <div className="grid grid-cols-7 gap-1">
                                {zona.parkings.map((p, parkingIndex) => (
                                    <div
                                        key={p.codigo}
                                        className={`h-[60px] text-[9px] flex items-end justify-center pb-1 text-white
                                            ${p.estado !== 'disponible' ? colorOcupado : colorDisponible}`}
                                    >
                                        P-{(zonaIndex * 7) + parkingIndex + 1}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}