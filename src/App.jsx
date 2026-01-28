//import { useState } from 'react'
import './App.css'
import Menu from './components/Menu';
import Header from './components/Header';
import FormAdd from './components/FormAdd';


const App = () => {

  return (
    <div className="contenedor">
      <Menu />
      <div className="contenidoMain">
        <Header />
      </div>
      <FormAdd />
    </div>
  )
}

export default App
