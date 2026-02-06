//import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Menu from './components/Menu';
import Main from './components/Main';
import PagBuques from './components/PagBuques';
import PagGruas from './components/PagGruas';


const App = () => {

  return (
    <Router>
      <div className="h-screen w-full flex text-lg font-sans">
        <Menu />
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="buques" element={<PagBuques />}/>
            <Route path="gruas" element={<PagGruas />}/>
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
