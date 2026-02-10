import MenuItems from './MenuItems';
import imagenUser from '../../assets/esther.jpg';
import logoutService from '../../services/logout';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const MenuOrdenador = () => {
    
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const logout = () => {

        //const user = JSON.parse(localStorage.getItem("user"));
        logoutService.hacerLogout(user);

        const rol = user.rol;
        navigate(`/login/${rol}`);
    }

    return (
        <nav className="hidden relative lg:block bg-[#2A5677] w-[12%] h-full flex flex-col items-center pt-8 text-white">
            <div className="w-[90%] flex flex-col items-center">
                <img src={imagenUser} alt="imagen usuario" className="rounded-full w-25 h-25 object-cover object-center"/>
                <p className="mt-5">Esther Díaz Soriano</p>
            </div>
            <div className="pt-10 w-full flex flex-wrap justify-center">
                <ul className="w-full p-0 m-0">
                <MenuItems />
                </ul>
            </div>
            <button onClick={logout} className="absolute left-15 bottom-10 flex items-center">
                <div className="bg-white rounded-full w-10 h-10 flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#2A5677" viewBox="0 0 256 256"><path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"></path></svg>
                </div>
                <p className="ml-3 font-bold">Salir</p>
            </button>
        </nav>
    )
}

export default MenuOrdenador;