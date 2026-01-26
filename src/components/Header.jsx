import Busqueda from './Busqueda';
import Listado from './Listado';
import Filtrado from './Filtrado';

const Header = () => {

    return (
        <header>
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