import { useState } from 'react';
import logo from '../assets/Logo.png';
import { Outlet } from 'react-router-dom';
import authService from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const Main = () => {

    const [mostrarLogout, setMostrarLogout] = useState(false);

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const logout = () => {

        authService.hacerLogout(user);

        const rol = user.rol;
        navigate(`/login/${rol}`);
    }

    return (
        <main className="relative w-full lg:w-[90%] min-h-dvh p-2 lg:pl-7.5 bg-white lg:ml-7.5">
          <div className="w-full flex justify-end">
            <div className="absolute w-full md:hidden flex justify-end">
              <div onClick={() => setMostrarLogout(!mostrarLogout)} className="mt-3 mr-4 p-1 w-10 h-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#5F84A2" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
              </div>
              {mostrarLogout && (
                <div className="absolute right-5 top-2 mt-2 w-64 bg-white rounded-[10px] shadow-xl border border-[#DFECF5] z-50 p-4">
                    <button onClick={logout} className="flex items-center w-full justify-center bg-[#DFECF5] rounded-full">
                      <div className="w-10 h-10 flex justify-center items-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#2A5677" viewBox="0 0 256 256"><path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"></path></svg>
                      </div>
                      <p className="ml-3 font-bold text-[#2A5677]">Salir</p>
                    </button>
                    <div className="flex flex-col gap-4">
                        <button onClick={() => setMostrarLogout(false)} className="text-white py-2 rounded-[5px] mt-2 font-bold hover:opacity-90">
                            <p className="text-[#5F84A2]">Cancelar</p>
                        </button>
                    </div>
                </div>
              )}
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