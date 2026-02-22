import { useNavigate } from "react-router-dom";
import puertoLogin from "../assets/puertoLogin.jpg";
import logo from "../assets/Logo.png";

const PagSelecRol = () => {
  const navigate = useNavigate();

  const buttonStyle =
    "w-full p-[12px] bg-[#2A5677] text-white rounded-[8px] mt-[15px] cursor-pointer font-bold tracking-widest uppercase transition-all hover:brightness-110 active:scale-95";

  return (
    <div className="relative flex justify-center items-center h-screen w-full font-sans">
      <div
        className="absolute inset-0 brightness-80 bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${puertoLogin})` }}
      ></div>

      <div className="relative pb-15 pt-10 pl-20 pr-20 rounded-[20px] brightness-90 bg-[#ffffffd9] flex flex-col justify-center items-center shadow-2xl max-w-[500px] w-full mx-4">
        <img src={logo} alt="logo transitport" className="w-35 h-35" />

        <h2 className="text-center mb-[5px] text-[#2A5677] font-bold text-2xl uppercase tracking-tight">
          TRANSITPORT
        </h2>

        <p className="text-[#2A5677] mb-8 font-medium text-sm">
          Seleccione su perfil de acceso
        </p>

        <div className="w-full flex flex-col items-center">
          <button
            onClick={() => navigate("/login/operario")}
            className={buttonStyle}
          >
            Operario
          </button>

          <button
            onClick={() => navigate("/login/administrativo")}
            className={buttonStyle}
          >
            Administrativo
          </button>

          <button
            onClick={() => navigate("/login/gestor")}
            className={buttonStyle}
          >
            Gestor
          </button>
        </div>
      </div>
    </div>
  );
};

export default PagSelecRol;
