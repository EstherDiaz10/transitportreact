import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import puertoLogin from "../assets/puertoLogin.jpg";
import logo from "../assets/Logo.png";
import loginService from "../services/login";
import { AuthContext } from '../context/AuthProvider';

const Login = ({rol}) => {

    const [datosUser, setDatosUser] = useState({email: '', password: ''});
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const buttonStyle = "w-full p-[12px] bg-[#2A5677] text-white rounded-[8px] mt-[20px] cursor-pointer";
    const inputStyle= "bg-white p-3 pl-4 mt-3 rounded-[10px] text-gray-500 w-full";

    const hacerLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await loginService.enviarLogin(datosUser, rol);
            const userData = response.success;
            console.log(response);
            console.log(userData);
            if (rol === userData.rol) {
                localStorage.setItem("token", userData.token);
                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);

                if (userData.rol === 'administrativo' || userData.rol === 'gestor') {
                    navigate('/buques');
                } else if (userData.rol === 'operario') {
                    navigate('/mis-ordenes')
                }
            } else {
                alert("No puedes iniciar sesión como " + rol);
            }

        } catch (error) {
            alert('Error en login: ' + error);
        }
    }
    
    const handleInput = (e) => {
        const {name, value} = e.target;
        setDatosUser({...datosUser, [name]: value});
    }

    return (
        <div className="relative flex justify-center items-center h-screen w-full">
            <div 
                className="absolute inset-0 brightness-80 bg-no-repeat bg-center bg-cover"
                style={{ backgroundImage: `url(${puertoLogin})` }}
            ></div>

            <div className="relative pb-15 pt-10 pl-25 pr-25 rounded-[20px] brightness-90 bg-[#ffffffd9] flex flex-col justify-center items-center">
                <img src={logo} alt="logo transitport" className="w-35 h-35" />
                <h2 className="text-center mb-[25px] text-[#2A5677] font-bold text-2xl">TRANSITPORT</h2>
                <form onSubmit={hacerLogin}>
                    <div className="mb-[15px]">
                        <label className="text-[#2A5677]" htmlFor="email">Email</label>
                        <input onChange={(e) => handleInput(e)} className={inputStyle} type="text" name="email" placeholder="Introduce tu email" />
                    </div>
                    <div className="mb-[15px]">
                        <label className="text-[#2A5677]" htmlFor="password">Contraseña</label>
                        <input onChange={(e) => handleInput(e)} className={inputStyle} type="password" name="password" placeholder="********" />
                    </div>
                    <button className={buttonStyle} type="submit" >ENTRAR</button>
                </form>
            </div>

        </div>
    )
}

export default Login;