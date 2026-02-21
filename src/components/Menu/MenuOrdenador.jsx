import MenuItems from './MenuItems';
import imagenUser from '../../assets/esther.jpg';
import authService from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const MenuOrdenador = () => {
    
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const logout = () => {

        authService.hacerLogout(user);

        const rol = user.rol;
        navigate(`/login/${rol}`);
    }

    return (
        <nav className="hidden lg:flex bg-[#2A5677] w-64 min-w-[240px] h-screen flex flex-col items-center pt-8 text-white">
            <div className="w-full flex flex-col items-center flex-shrink-0">
                <img src={imagenUser} alt="imagen usuario" className="rounded-full w-25 h-25 object-cover object-center"/>
                <p className="mt-5">Esther Díaz Soriano</p>
            </div>
            <div className="pt-10 w-full flex flex-grow justify-center">
                <ul className="w-full p-0 m-0">
                <MenuItems user={user}/>
                </ul>
            </div>
            <div className="w-full p-8 flex-shrink-0">
                <button onClick={logout} className="flex items-center w-full justify-center">
                    <div className="bg-white rounded-full w-10 h-10 flex justify-center items-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#2A5677" viewBox="0 0 256 256"><path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"></path></svg>
                    </div>
                    <p className="ml-3 font-bold">Salir</p>
                </button>
            </div>
        </nav>
    )
}

export default MenuOrdenador;