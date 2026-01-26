//import { useState } from 'react'
import './App.css'
import Filtrado from './components/Filtrado';
import Menu from './components/Menu';
import Busqueda from './components/Busqueda';
import Listado from './components/Listado';

const App = () => {

  return (
    <div className="contenedor">
      <Menu />
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
