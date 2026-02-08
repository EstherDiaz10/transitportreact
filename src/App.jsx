//import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import './App.css'
import Menu from './components/Menu/Menu';
import Main from './pages/Main';
import PagBuques from './pages/PagBuques';
import PagGruas from './pages/PagGruas';


const App = () => {

  return (
    <AuthProvider>
      <Router>
        <div className="h-screen w-full flex text-lg font-sans">
          <Menu />
          <Routes>
            <Route path="/" element={<Main />}>
              <Route path="buques" element={<PagBuques />}/>
              <Route path="gruas" element={<PagGruas />}/>
              {/*<Route path="contenedores" element={<PagContenedores />}/>
              <Route path="ordenes" element={<PagOrdenes />}/>
              <Route path="patio" element={<PagPatio />}/>
              <Route path="misOrdenes" element={<PagMisOrdenes />}/>*/}
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
