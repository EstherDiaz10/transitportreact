import imagenUser from '../img/imagenUser.jpeg';

const MenuAdministrativo = () => {

  return(
    <nav className="menu">
      <div className="usuario">
        <img src={imagenUser} alt="imagen usuario" className="imagenUsuario"/>
        <p>Esther Díaz Soriano</p>
      </div>
      <div className="listado">
        <ul>
          <li><i className="fa-solid fa-pen-to-square"></i>Ordenes</li>
          <li><i className="fa-solid fa-truck-ramp-box"></i>Grúas</li>
          <li><i className="fa-solid fa-square"></i>Contenedores</li>
          <li><i className="fa-solid fa-ship"></i>Buques</li>
        </ul>
      </div>
    </nav>
  )
}

export default MenuAdministrativo;