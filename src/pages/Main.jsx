import logo from '../assets/Logo.png';
import { useState, useEffect } from 'react';
import FormAnyadir from '../components/Formularios/FormAnyadir';
import Modal from '../components/Modal';
import { Outlet } from 'react-router-dom';

const Main = () => {

    return (
        <main className="relative w-[90%] h-dvh pt-6 md:pr-6 p-2 md:pl-7.5 bg-white ml-7.5">
          <div className="w-full flex justify-between">
            <div className="w-[50%] flex items-end">
                {/*{crearElemento && (
                  <button onClick={() => setCrearElemento(false)}className="bg-[#5F84A2] text-white mt-3 rounded-[5px] w-12 h-12 flex justify-center items-center hover:bg-[#DFECF5] hover:text-[#5F84A2] hover:border-3 hover:border-[#5F84A2]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path></svg>
                  </button>
                )}*/}
            </div>
            <div className="hidden md:w-[20%] md:relative md:z-50 md:flex md:justify-end md:items-center md:text-[#2A5677] md:gap-4">
              <h1 className="font-bold text-3xl">TransitPort</h1>
              <img src={logo} alt="logotipo transitport" className="w-25 h-25"/>
            </div>
          </div>
          <Outlet />
        </main>
    )
}

export default Main;