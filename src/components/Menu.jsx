import imagenUser from '../img/imagenUser.jpeg';
import MenuItems from './MenuItems';

const Menu = () => {

  return(
    <nav className="menu">
      <div className="usuario">
        <img src={imagenUser} alt="imagen usuario" className="imagenUsuario"/>
        <p>Esther Díaz Soriano</p>
      </div>
      <div className="listado">
         <ul>
          <MenuItems />
        </ul>
      </div>
    </nav>
  )
}

export default Menu;