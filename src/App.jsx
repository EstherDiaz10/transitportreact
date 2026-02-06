//import { useState } from 'react'
import './App.css'
import Menu from './components/Menu';
import Main from './components/Main';
import FormAdd from './components/FormAdd';


const App = () => {

  return (
    <div className="h-screen w-full flex text-lg font-sans">
      <Menu />
      <Main />
    </div>
  )
}

export default App
