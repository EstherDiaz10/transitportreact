//import { useState } from 'react'
import './App.css'
import Menu from './components/Menu';
import Header from './components/Header';


const App = () => {

  return (
    <div className="contenedor">
      <Menu />
      <div className="contenidoMain">
        <Header />
      </div>
    </div>
  )
}

export default App
