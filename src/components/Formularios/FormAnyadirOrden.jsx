import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";
import ordenService from "../../services/ordenes";
import buqueService from "../../services/buques";
import parkingService from "../../services/parkings";
import gruaService from "../../services/gruas";
import Select from "../Select";

const FormAnyadirOrden = ({ cerrarModal, setOrdenes }) => {
    const inputStyle = "bg-white p-1 pl-4 rounded-[10px] text-gray-500 w-full";
    const lineStyle = "flex justify-between gap-10";
    const columnStyle = "flex flex-wrap w-[50%]";

    const { user } = useContext(AuthContext);

    const [buques, setBuques] = useState([]);
    const [parkings, setParkings] = useState([]);
    const [gruas, setGruas] = useState([]);
    const [contenedoresDisponibles, setContenedoresDisponibles] = useState([]);
    const [erroresOrden, setErroresOrden] = useState({});

    const [datosNuevaOrden, setDatosNuevaOrden] = useState({
        tipo: "descarga",
        prioridad: "media",
        estado: "pendiente",
        administrativo_id: user.id,
        buque_id: null,
        parking_id: null,
        contenedor_id: null,
        grua_sts_id: null,
        grua_sc_id: null,
        operario_sts_id: null,
        operario_sc_id: null,
        observaciones: "",
    });

    useEffect(() => {
        buqueService.listadoBuquesConContenedores().then((data) => setBuques(data));
        parkingService.listadoParkings().then((data) => setParkings(data));
        gruaService.listadoGruas().then((data) => setGruas(data));
    }, []);

    useEffect(() => {
        let lista = [];
        if (datosNuevaOrden.tipo === "descarga" && datosNuevaOrden.buque_id) {
            const buque = buques.find(
                (b) => b.id === Number(datosNuevaOrden.buque_id),
            );
            lista = buque?.contenedores || [];
        } else if (datosNuevaOrden.tipo === "carga" && datosNuevaOrden.parking_id) {
            const parking = parkings.find(
                (p) => p.id === Number(datosNuevaOrden.parking_id),
            );
            lista = parking?.contenedor ? [parking.contenedor] : [];
        }
        setContenedoresDisponibles(lista);
    }, [
        datosNuevaOrden.buque_id,
        datosNuevaOrden.parking_id,
        datosNuevaOrden.tipo,
        buques,
        parkings,
    ]);

    const validar = () => {
        let nuevosErrores = {};
        let esValido = true;

        if (!datosNuevaOrden.contenedor_id) {
            nuevosErrores.contenedor_id = "Debes seleccionar un contenedor";
            esValido = false;
        }

        if (datosNuevaOrden.tipo === "descarga") {
            if (!datosNuevaOrden.buque_id) {
                nuevosErrores.buque_id = "Debes seleccionar un buque origen";
                esValido = false;
            }

            if (!datosNuevaOrden.parking_id) {
                nuevosErrores.parking_id = "Debes seleccionar un parking destino";
                esValido = false;
            }
        }

        if (datosNuevaOrden.tipo === "carga") {
            if (!datosNuevaOrden.parking_id) {
                nuevosErrores.parking_id = "Debes seleccionar un parking origen";
                esValido = false;
            }

            if (!datosNuevaOrden.buque_id) {
                nuevosErrores.buque_id = "Debes seleccionar un buque destino";
                esValido = false;
            }
        }

        if (!datosNuevaOrden.grua_sts_id) {
            nuevosErrores.grua_sts_id = "Debes seleccionar una grúa STS";
            esValido = false;
        }

        if (!datosNuevaOrden.grua_sc_id) {
            nuevosErrores.grua_sc_id = "Debes seleccionar una grúa SC";
            esValido = false;
        }

        setErroresOrden(nuevosErrores);
        return esValido;
    };

    const crearOrden = async (e) => {
        e.preventDefault();

        const valido = validar();
        if (!valido) return;

        try {
            await ordenService.crearOrden(datosNuevaOrden);
            const data = await ordenService.listadoOrdenes();
            setOrdenes(data);
            cerrarModal();
        } catch (error) {
            console.error("Error al crear la orden:", error);
        }
    };

    const opcionesBuque = buques.map((b) => ({
        value: b.id,
        label: `Buque: ${b.nombre}`,
    }));
    const opcionesParkingLibres = parkings
        .filter((p) => p.estado === "libre")
        .map((p) => ({ value: p.id, label: `P-${p.id} (Libre)` }));
    const opcionesParkingOcupados = parkings
        .filter((p) => p.estado === "ocupado")
        .map((p) => ({ value: p.id, label: `P-${p.id} (Ocupado)` }));
    const opcionesGruaSTS = gruas
        .filter((g) => g.tipo.toLowerCase() === "sts")
        .map((g) => ({ value: g.id, label: `STS-${g.id}` }));
    const opcionesGruaSC = gruas
        .filter((g) => g.tipo.toLowerCase() === "sc")
        .map((g) => ({ value: g.id, label: `SC-${g.id}` }));
    const opcionesContenedores = contenedoresDisponibles.map((c) => ({
        value: c.id,
        label: `Contenedor: ${c.num_serie || c.id}`,
    }));

    return (
        <div className="flex justify-center">
            <div className="w-300 h-220 pt-9 pl-10 pr-10 md:pl-18 md:pr-18 md:pt-13 bg-[#B7D0E1] rounded-[50px]">
                <h1 className="text-center text-2xl md:text-3xl font-bold text-[#2A5677] pb-8">
                    Añadir Nueva Orden
                </h1>

                <form onSubmit={crearOrden} className="text-[#2A5677]">
                    <div className={lineStyle}>
                        <div className={columnStyle}>
                            <label>Tipo de orden</label>
                            <select
                                name="tipo"
                                className={`${inputStyle} mt-3 p-2`}
                                onChange={(e) =>
                                    setDatosNuevaOrden({
                                        ...datosNuevaOrden,
                                        tipo: e.target.value,
                                        buque_id: null,
                                        parking_id: null,
                                        contenedor_id: null,
                                    })
                                }
                                value={datosNuevaOrden.tipo}
                            >
                                <option value="">Selecciona un tipo</option>
                                <option value="descarga">Descarga</option>
                                <option value="carga">Carga</option>
                            </select>
                        </div>

                        <div className={columnStyle}>
                            <label>Prioridad</label>
                            <select
                                name="prioridad"
                                className={`${inputStyle} mt-3 p-2`}
                                onChange={(e) =>
                                    setDatosNuevaOrden({
                                        ...datosNuevaOrden,
                                        prioridad: e.target.value,
                                    })
                                }
                                value={datosNuevaOrden.prioridad}
                            >
                                <option value="">Selecciona una prioridad</option>
                                <option value="baja">Baja</option>
                                <option value="media">Media</option>
                                <option value="alta">Alta</option>
                            </select>
                        </div>
                    </div>

                    {/* ORIGEN */}
                    <div className={`${lineStyle} mt-6`}>
                        <div className={columnStyle}>
                            <label>
                                Origen (
                                {datosNuevaOrden.tipo === "descarga" ? "Buque" : "Parking"})
                            </label>
                            <div className="w-full mt-3">
                                <Select
                                    options={
                                        datosNuevaOrden.tipo === "descarga"
                                            ? opcionesBuque
                                            : opcionesParkingOcupados
                                    }
                                    onChange={(s) =>
                                        setDatosNuevaOrden({
                                            ...datosNuevaOrden,
                                            [datosNuevaOrden.tipo === "descarga"
                                                ? "buque_id"
                                                : "parking_id"]: s?.value,
                                        })
                                    }
                                />
                            </div>

                            {datosNuevaOrden.tipo === "descarga" && erroresOrden.buque_id && (
                                <p className="text-red-600 text-sm mt-1">
                                    {erroresOrden.buque_id}
                                </p>
                            )}

                            {datosNuevaOrden.tipo === "carga" && erroresOrden.parking_id && (
                                <p className="text-red-600 text-sm mt-1">
                                    {erroresOrden.parking_id}
                                </p>
                            )}
                        </div>

                        {/* DESTINO */}
                        <div className={columnStyle}>
                            <label>
                                Destino (
                                {datosNuevaOrden.tipo === "descarga" ? "Parking" : "Buque"})
                            </label>
                            <div className="w-full mt-3">
                                <Select
                                    options={
                                        datosNuevaOrden.tipo === "descarga"
                                            ? opcionesParkingLibres
                                            : opcionesBuque
                                    }
                                    onChange={(s) =>
                                        setDatosNuevaOrden({
                                            ...datosNuevaOrden,
                                            [datosNuevaOrden.tipo === "descarga"
                                                ? "parking_id"
                                                : "buque_id"]: s?.value,
                                        })
                                    }
                                />
                            </div>

                            {datosNuevaOrden.tipo === "descarga" &&
                                erroresOrden.parking_id && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {erroresOrden.parking_id}
                                    </p>
                                )}

                            {datosNuevaOrden.tipo === "carga" && erroresOrden.buque_id && (
                                <p className="text-red-600 text-sm mt-1">
                                    {erroresOrden.buque_id}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* CONTENEDOR */}
                    <div className="mt-6">
                        <label>Contenedor</label>
                        <div className="mt-3">
                            <Select
                                options={opcionesContenedores}
                                onChange={(c) =>
                                    setDatosNuevaOrden({
                                        ...datosNuevaOrden,
                                        contenedor_id: c?.value,
                                    })
                                }
                            />
                        </div>
                        {erroresOrden.contenedor_id && (
                            <p className="text-red-600 text-sm mt-1">
                                {erroresOrden.contenedor_id}
                            </p>
                        )}
                    </div>

                    {/* GRUAS */}
                    <div className={`${lineStyle} mt-6`}>
                        <div className={columnStyle}>
                            <label>Grúa STS</label>
                            <div className="w-full mt-3">
                                <Select
                                    options={opcionesGruaSTS}
                                    onChange={(g) =>
                                        setDatosNuevaOrden({
                                            ...datosNuevaOrden,
                                            grua_sts_id: g?.value,
                                        })
                                    }
                                />
                            </div>
                            {erroresOrden.grua_sts_id && (
                                <p className="text-red-600 text-sm mt-1">
                                    {erroresOrden.grua_sts_id}
                                </p>
                            )}
                        </div>

                        <div className={columnStyle}>
                            <label>Grúa SC</label>
                            <div className="w-full mt-3">
                                <Select
                                    options={opcionesGruaSC}
                                    onChange={(g) =>
                                        setDatosNuevaOrden({
                                            ...datosNuevaOrden,
                                            grua_sc_id: g?.value,
                                        })
                                    }
                                />
                            </div>
                            {erroresOrden.grua_sc_id && (
                                <p className="text-red-600 text-sm mt-1">
                                    {erroresOrden.grua_sc_id}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <label>Observaciones</label>
                        <textarea
                            name="observaciones"
                            className={`${inputStyle} mt-3`}
                            rows="3"
                            onChange={(e) =>
                                setDatosNuevaOrden({
                                    ...datosNuevaOrden,
                                    observaciones: e.target.value,
                                })
                            }
                            value={datosNuevaOrden.observaciones}
                        />
                    </div>

                    <div className="mt-5 flex justify-center">
                        <button
                            type="submit"
                            className="bg-[#5F84A2] text-white font-bold pt-2 pb-2 pr-6 pl-6 rounded-[5px]"
                        >
                            Crear orden
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormAnyadirOrden;
