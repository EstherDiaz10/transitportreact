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

  const seleccionarBuque = () => {

  }

    return (
        <header>
          <div className="w-full flex justify-end items-center text-[#2A5677] gap-4">
            <h1 className="font-bold">TransitPort</h1>
            <img src={logo} alt="logotipo transitport" className="w-25 h-25"/>
          </div>
          <h1 className="text-3xl font-bold text-[#2A5677]">Listado de buques</h1>
          <div className="w-[95%] pt-5 flex justify-between">
            <Filtrado />
            {buqueSeleccionado === null && (
              <Busqueda />
            )}
          </div>
          <div className={`${buqueSeleccionado ? 'w-2/3' : 'w-full'}`}>
            <Listado data={buques} onSelect={setBuqueSeleccionado} seleccionado={buqueSeleccionado ? true : false}/>
          </div>
          <div>
            {buqueSeleccionado !== null && (
              <Detalles />
            )}
          </div>
        </header>
    )
}

export default Header;