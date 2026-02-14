import logo from '../assets/Logo.png';
import { Outlet } from 'react-router-dom';

const Main = () => {

    return (
        <main className="relative w-full lg:w-[90%] min-h-dvh p-2 lg:pl-7.5 bg-white lg:ml-7.5">
          <div className="w-full flex justify-end">
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