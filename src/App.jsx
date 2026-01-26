//import { useState } from 'react'
import './App.css'
import Filtrado from './components/Filtrado';
import MenuAdministrativo from './components/MenuAdministrativo';
import Busqueda from './components/Busqueda';
import Listado from './components/Listado';

const App = () => {

  return (
    <div className="contenedor">
      <MenuAdministrativo />
      <div className="contenidoMain">
        <header>
          <h1 className="titulo">Listado de buques</h1>
          <div className="filtradoBusqueda">
            <Filtrado />
            <Busqueda />
          </div>
          <Listado />
        </header>
      </div>
    </div>
  )
}

export default App
