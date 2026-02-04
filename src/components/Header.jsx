import Busqueda from './Busqueda';
import Listado from './Listado';
import Filtrado from './Filtrado';
import Detalles from './Detalles';
import logo from '../img/Logo.png';
import Botones from './Botones';
//import data from '../data/db';
import { useState, useEffect } from 'react';
import FormAnyadir from './FormAnyadir';
import buqueService from '../services/buques';

const Header = () => {

  const [buques, setBuques] = useState([]);
  const [buqueSeleccionado, setBuqueSeleccionado] = useState(null);
  const [crearBuque, setCrearBuque] = useState(false);
  const [selectFiltrado, setFiltrarEstado] = useState('estado');
  const [inputBuscar, setBuscar] = useState('');
  
  useEffect(()=>{
    buqueService
      .listadoBuques()
      .then(data =>{
        setBuques(data)
      })
  }, [])

  let buquesAMostrar = buques;

  if(selectFiltrado !== 'estado') {
    buquesAMostrar = buquesAMostrar.filter((buque) => buque.estado.toLowerCase() === selectFiltrado)
  }

  if(inputBuscar !== '') {
    buquesAMostrar = buquesAMostrar.filter((buque) => {
      const prefijoIdBuque = "B-";
      const nombreEncontrado = buque.nombre.toLowerCase().includes(inputBuscar.toLowerCase());
      const idEncontrada  = (prefijoIdBuque + buque.id.toString()).includes(inputBuscar);

      return nombreEncontrado || idEncontrada;
    });
  }

  //const ultimoId = (buques && buques.length > 0 ? Math.max(...buques.map(buque => buque.id))+1 : null);
    return (
        <header className="relative w-[90%] h-dvh pt-6 pr-6 p-2 pl-7.5 bg-white ml-7.5">
          <div className="w-full flex">
            <div className="w-[50%]">
                {crearBuque && (
                  <button onClick={() => setCrearBuque(false)} className="bg-[#5F84A2] text-white mt-3 rounded-[5px] w-12 h-12 flex justify-center items-center hover:bg-[#DFECF5] hover:text-[#5F84A2] hover:border-3 hover:border-[#5F84A2]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path></svg>
                  </button>
                )}
            </div>
            <div className="w-[50%] relative z-50 flex justify-end items-center text-[#2A5677] gap-4">
              {buqueSeleccionado && !crearBuque ? (
                <button onClick={() => setBuqueSeleccionado(null)} className="mr-80 w-10 h-10 flex justify-center align-center cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path></svg>
                </button>
              ) : (
                <></>
              )}
              <h1 className="font-bold text-3xl">TransitPort</h1>
              <img src={logo} alt="logotipo transitport" className="w-25 h-25"/>
            </div>
          </div>
          {!crearBuque && (
            <>
              <h1 className="text-3xl font-bold text-[#2A5677]">Listado de buques</h1>
              <div className={`${!buqueSeleccionado ? 'w-[93%]' : 'w-[49%]'} pt-5 flex justify-between`}>
                <Filtrado setFiltrarEstado={setFiltrarEstado}/>
                <Busqueda setBuscar={setBuscar} />
              </div>
            </>
          )}
          {crearBuque && (
            <div className="flex justify-center">
              <FormAnyadir />
            </div>
          )}
          {!crearBuque && (
            <>
              <div className={`${buqueSeleccionado ? 'w-[53%]' : 'w-full'}`}>
                <Listado data={buquesAMostrar} onSelect={setBuqueSeleccionado} seleccionado={buqueSeleccionado} crearBuque={setCrearBuque}/>
              </div>
              {buqueSeleccionado !== null && (
                <div className="absolute top-0 right-0 bg-[#B7D0E1] h-full w-[45%] rounded-l-[50px] pt-[7%] pl-[5%] pr-[5%]">
                  <Detalles buque={buqueSeleccionado} setBuqueSeleccionado={setBuqueSeleccionado} setBuques={setBuques}/>
                </div>
              )}
            </>
          )}
          
        </header>
    )
}

export default Header;