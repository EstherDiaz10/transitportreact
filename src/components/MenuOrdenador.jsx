import imagenUser from '../img/esther.jpg';
import MenuItems from './MenuItems';

const MenuOrdenador = () => {
    
    return (
        <nav className="hidden lg:block bg-[#2A5677] w-[12%] h-full flex flex-col items-center pt-8 text-white">
            <div className="w-[90%] flex flex-col items-center">
                <img src={imagenUser} alt="imagen usuario" className="rounded-full w-25 h-25 object-cover object-center"/>
                <p className="mt-5">Esther Díaz Soriano</p>
            </div>
            <div className="pt-10 w-full flex flex-wrap justify-center">
                <ul className="w-full p-0 m-0">
                <MenuItems />
                </ul>
            </div>
        </nav>
    )
}

export default MenuOrdenador;