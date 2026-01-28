import Busqueda from './Busqueda';
import Listado from './Listado';
import Filtrado from './Filtrado';
import logo from '../img/Logo.png';

const Header = () => {

    return (
        <header>
          <div className="logotipo">
            <h2>TransiPort</h2>
            <img src={logo} alt="logotipo transiport" />
          </div>
          <h1 className="titulo">Listado de buques</h1>
          <div className="filtradoBusqueda">
            <Filtrado />
            <Busqueda />
          </div>
          <Listado />
        </header>
    )
}

export default Header;