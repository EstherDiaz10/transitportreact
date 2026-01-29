//import { useState } from 'react'
import './App.css'
import Menu from './components/Menu';
import Header from './components/Header';
import FormAdd from './components/FormAdd';


const App = () => {

  return (
    <div className="h-screen w-full flex text-lg font-sans">
      <Menu />
      <div className="w-[90%] p-2 pl-[30px] bg-white ml-[30px]">
        <Header />
      </div>
    </div>
  )
}

export default App
