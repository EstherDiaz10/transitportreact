//import { useState } from 'react'
import './App.css'
import imagenUser from './img/imagenUser.jpeg';

const NavBar = () => {

  return(
    <nav className="menu">
      <div className="usuario">
        <img src={imagenUser} alt="imagen usuario" className="imagenUsuario"/>
        <p>Esther Díaz Soriano</p>
      </div>
      <div className="listado">
        <ul>
          <li><i className="fa-solid fa-pen-to-square"></i>Ordenes</li>
          <li><i className="fa-solid fa-truck-ramp-box"></i>Grúas</li>
          <li><i className="fa-solid fa-square"></i>Contenedores</li>
          <li><i className="fa-solid fa-ship"></i>Buques</li>
        </ul>
      </div>
    </nav>
  )
}

const Filtrado = () => {
  return (
    <div>
      <select name="tipoBuque" id="buque">
        <option value="tipo">Tipo buque</option>
        <option value="portacontenedores">Portacontenedores</option>
      </select>
      <select name="estado" id="estadoBuque">
        <option value="estado">Estado</option>
        <option value="espera">En espera</option>
        <option value="atracado">Atracado</option>
        <option value="salido">Salido</option>
      </select>
    </div>
  )
}

const Busqueda = () => {
  return (
    <div className="barraBusqueda">
      <div className="iconoBusqueda">
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <input className="inputBusqueda" type="text" />
    </div>
  )
}

const Listado = () => {

  return(
    <div>
      
    </div>
  )
}

const App = () => {

  return (
    <div className="contenedor">
      <NavBar />
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
