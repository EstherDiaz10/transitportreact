//import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//import { AuthProvider } from './context/AuthProvider';
import './App.css'
import Menu from './components/Menu/Menu';
import Main from './pages/Main';
import PagBuques from './pages/PagBuques';
import PagGruas from './pages/PagGruas';
import Login from './pages/Login';


const App = () => {

  return (

      <Router>
          <Routes>
            <Route path="/login/operario" element={<Login rol="operario" />} />
            <Route path="/login/administrativo" element={<Login rol="administrativo" />} />
            <Route path="/login/gestor" element={<Login rol="gestor" />} />
            <Route
              path="/*"
              element={
                <div className="h-screen w-full flex text-lg font-sans">
                  <Menu />
                  <Main />
                </div>
              }
            >
            <Route path="buques" element={<PagBuques />}/>
            <Route path="gruas" element={<PagGruas />}/>
            {/*<Route path="contenedores" element={<PagContenedores />}/>
            <Route path="ordenes" element={<PagOrdenes />}/>
            <Route path="patio" element={<PagPatio />}/>
            <Route path="misOrdenes" element={<PagMisOrdenes />}/>*/}
            </Route>
          </Routes>
      </Router>

  )
}

export default App
