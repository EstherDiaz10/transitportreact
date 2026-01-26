 const MenuItems = () => {
    const rol ='administrativo'
    switch (rol) {
      case 'operario':
        return (
          <>
            <li>
              <i className="fa-solid fa-pen-to-square"></i>
              Órdenes
            </li>
            <li>
              <i className="fa-solid fa-route"></i>
              Rutas
            </li>
          </>
        );

      case 'administrativo':
        return (
          <>
            <li>
              <i className="fa-solid fa-pen-to-square"></i>
              Órdenes
            </li>
            <li>
              <i className="fa-solid fa-truck-ramp-box"></i>
              Grúas
            </li>
            <li>
              <i className="fa-solid fa-square"></i>
              Contenedores
            </li>
            <li>
              <i className="fa-solid fa-ship"></i>
              Buques
            </li>
          </>
        );

      case 'gestor':
        return (
          <>
            <li>
              <i className="fa-solid fa-pen-to-square"></i>
              Órdenes
            </li>
            <li>
              <i className="fa-solid fa-truck-ramp-box"></i>
              Grúas
            </li>
            <li>
              <i className="fa-solid fa-square"></i>
              Contenedores
            </li>
            <li>
              <i className="fa-solid fa-ship"></i>
              Buques
            </li>
            <li>
              <i className="fa-solid fa-users"></i>
              Usuarios
            </li>
            <li>
              <i className="fa-solid fa-warehouse"></i>
              Patio
            </li>
          </>
        );

      default:
        return null;
    }
  };

  export default MenuItems;