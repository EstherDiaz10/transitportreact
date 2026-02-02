import Busqueda from './Busqueda';
import Listado from './Listado';
import Filtrado from './Filtrado';
import Detalles from './Detalles';
import logo from '../img/Logo.png';
import data from '../data/db.json';
import { useEffect, useState } from 'react';
import buqueService from '../services/buques'

const Header = () => {

  const [buques, setBuques] = useState([]);
  const [buqueSeleccionado, setBuqueSeleccionado] = useState(null);

  useEffect(()=>{
    buqueService
      .listadoBuques()
      .then(data =>{
        setBuques(data)
      })
  }, [])

  const busquedaRef = useRef();

    return (
        <header className="relative w-[90%] h-dvh pt-6 pr-6 p-2 pl-7.5 bg-white ml-7.5">
          <div className="w-full relative z-50 flex justify-end items-center text-[#2A5677] gap-4">
            <h1 className="font-bold text-3xl">TransitPort</h1>
            <img src={logo} alt="logotipo transitport" className="w-25 h-25"/>
          </div>
          <h1 className="text-3xl font-bold text-[#2A5677]">Listado de buques</h1>
          <div className="w-full pt-5 flex justify-between">
            <Filtrado />
            {buqueSeleccionado === null && (
              <Busqueda ref={busquedaRef}/>
            )}
          </div>
          <div className={`${buqueSeleccionado ? 'w-[53%]' : 'w-full'}`}>
            <Listado data={data} onSelect={setBuqueSeleccionado} seleccionado={buqueSeleccionado ? true : false}/>
          </div>
            {buqueSeleccionado !== null && (
              <div className="absolute top-0 right-0 bg-[#B7D0E1] h-full w-[45%] rounded-l-[50px] pt-[7%] pl-[5%] pr-[5%]">
                <Detalles buque={buqueSeleccionado}/>
              </div>
            )}
        </header>
    )
}

export default Header;