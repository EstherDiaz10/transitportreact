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
            <li className="grua">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 256"><rect width="256" height="256" fill="none"/><line x1="24" y1="168" x2="128" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M24,200V96a8,8,0,0,1,8-8h72l24,80v32a8,8,0,0,1-8,8H32A8,8,0,0,1,24,200Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="56" y1="88" x2="56" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M104,88,224,24V160a8,8,0,0,1-8,8H200a8,8,0,0,1-8-8v-8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
              Grúas
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 256"><rect width="256" height="256" fill="none"/><line x1="128" y1="48" x2="128" y2="208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M128,208l106.2-30.34A8,8,0,0,0,240,170V86a8,8,0,0,0-5.8-7.69L128,48,22.87,63A8,8,0,0,0,16,70.94V185.06A8,8,0,0,0,22.87,193Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="96" y1="128" x2="48" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="72" y1="56" x2="72" y2="200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
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