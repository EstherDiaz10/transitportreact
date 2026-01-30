import Busqueda from './Busqueda';
import Listado from './Listado';
import Filtrado from './Filtrado';
import logo from '../img/Logo.png';
import data from '../data/db.json';
import { useState } from 'react';

const Header = () => {

  const [buqueSeleccionado, setBuqueSeleccionado] = useState(null);

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
            <Busqueda />
          </div>
          <div className={`${buqueSeleccionado ? 'w-2/3' : 'w-full'}`}>
            <Listado data={data} onSelect={setBuqueSeleccionado} seleccionado={buqueSeleccionado ? true : false}/>
            
          </div>
        </header>
    )
}

export default Header;