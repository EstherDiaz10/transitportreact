import { useEffect, useState } from "react";
import axios from "axios";

export default function PagPatio() {

    const [data, setData] = useState({
        zonas_descarga: [],
        sts: [],
        sc: [],
        patio: []
    });

    useEffect(() => {

        const cargar = () => {
            axios.get("http://localhost/api/patio")
                .then(res => setData(res.data))
                .catch(err => console.error(err));
        };

        cargar();

        const intervalo = setInterval(cargar, 3000);
        return () => clearInterval(intervalo);

    }, []);

    return (
        <div style={{
            backgroundColor: '#dbe3ea',
            padding: 30,
            minHeight: '100vh'
        }}>

            {/* ================= BUQUE ================= */}
            <div style={{
                height: 120,
                backgroundColor: '#cfd8dc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 30
            }}>
                <strong>BUQUE</strong>
            </div>

            {/* ================= STS ================= */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: 20
            }}>
                {data.sts.map((sts, index) => (
                    <div
                        key={sts.id}
                        style={{
                            width: 70,
                            height: 70,
                            borderRadius: '50%',
                            backgroundColor: sts.estado !== 'disponible'
                                ? '#8b3a3a'
                                : '#7fa47f',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 12,
                            color: 'white'
                        }}
                    >
                        STS-{index + 1}
                    </div>
                ))}
            </div>

            {/* ================= ZONAS DESCARGA ================= */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: 25
            }}>
                {data.zonas_descarga.map((z, index) => (
                    <div
                        key={z.codigo}
                        style={{
                            width: 120,
                            height: 35,
                            backgroundColor: z.estado !== 'disponible'
                                ? '#8b3a3a'
                                : '#7fa47f',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 12,
                            color: 'white'
                        }}
                    >
                        ZD-{index + 1}
                    </div>
                ))}
            </div>

            {/* ================= SC ================= */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 10,
                marginBottom: 30
            }}>
                {data.sc.map((sc, index) => (
                    <div
                        key={sc.id}
                        style={{
                            width: 40,
                            height: 40,
                            backgroundColor: sc.estado !== 'disponible'
                                ? '#8b3a3a'
                                : '#7fa47f',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 10,
                            color: 'white'
                        }}
                    >
                        SC-{index + 1}
                    </div>
                ))}
            </div>

            {/* ================= PATIO ================= */}
            <div style={{
                backgroundColor: '#b0bec5',
                padding: 20
            }}>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 25
                }}>

                    {data.patio.map((zona, zonaIndex) => (
                        <div key={zona.zona}>

                            <div style={{
                                fontSize: 12,
                                marginBottom: 6
                            }}>
                                ZP-{zonaIndex + 1}
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(7, 1fr)',
                                gap: 4
                            }}>
                                {zona.parkings.map((p, parkingIndex) => (
                                    <div
                                        key={p.codigo}
                                        style={{
                                            height: 60,
                                            backgroundColor: p.estado !== 'disponible'
                                                ? '#8b3a3a'
                                                : '#7fa47f',
                                            fontSize: 9,
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            justifyContent: 'center',
                                            paddingBottom: 4,
                                            color: 'white'
                                        }}
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
