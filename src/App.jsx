//import { useState } from 'react'
import './App.css'
import Menu from './components/Menu';
import Header from './components/Header';
import FormAdd from './components/FormAdd';


const App = () => {

  return (
    <div className="h-screen w-full flex text-lg font-sans">
      <Menu />
      <Header />
    </div>
  )
}

export default App
