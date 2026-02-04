 const MenuItems = () => {
    const rol ='administrativo'
    const styles = "w-full flex items-center mt-7 ml-2 pl-3 font-bold list-none";
    const activeStyles = `relative bg-white text-[#2A5677] pt-2 pb-2 rounded-l-full
              before:content-[''] before:absolute before:w-10 before:h-10
              before:rounded-full before:-top-10 before:right-2 before:shadow-[19px_19px_0_white]
              after:content-[''] after:absolute after:w-10 after:h-10
              after:rounded-full after:-bottom-10 after:right-2 after:shadow-[19px_-19px_0_white]
            `;
    switch (rol) {
      case 'operario':
        return (
          <>
            <li className="w-full flex items-center mt-7 font-bold list-none hover:text-[#d2d3d3]">
              <i className="fa-solid fa-pen-to-square"></i>
              Órdenes
            </li>
            <li className="w-full flex items-center mt-7 font-bold list-none hover:text-[#d2d3d3]">
              <i className="fa-solid fa-route"></i>
              Rutas
            </li>
          </>
        );

      case 'administrativo':
        return (
          <>
            <li className={styles}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,58.34l-32-32a8,8,0,0,0-11.32,0l-96,96A8,8,0,0,0,88,128v32a8,8,0,0,0,8,8h32a8,8,0,0,0,5.66-2.34l96-96A8,8,0,0,0,229.66,58.34ZM124.69,152H104V131.31l64-64L188.69,88ZM200,76.69,179.31,56,192,43.31,212.69,64ZM224,128v80a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h80a8,8,0,0,1,0,16H48V208H208V128a8,8,0,0,1,16,0Z"></path></svg>
              <span className="pl-5">Órdenes</span>
            </li>
            <li className={styles}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256"><path d="M228.12,17.14a8,8,0,0,0-7.88-.2L102,80H32A16,16,0,0,0,16,96V200a16,16,0,0,0,16,16h88a16,16,0,0,0,16-16V168a7.81,7.81,0,0,0-.34-2.3L113.54,92,216,37.33V160H200v-8a8,8,0,0,0-16,0v8a16,16,0,0,0,16,16h16a16,16,0,0,0,16-16V24A8,8,0,0,0,228.12,17.14ZM98.05,96l19.2,64H64V96ZM48,96v64H32V96ZM32,200h0V176h88v24Z"></path></svg>
              <span className="pl-5">Grúas</span>
            </li>
            <li className={styles}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256"><path d="M236.4,70.65,130.2,40.31a8,8,0,0,0-3.33-.23L21.74,55.1A16.08,16.08,0,0,0,8,70.94V185.06A16.08,16.08,0,0,0,21.74,200.9l105.13,15A8.47,8.47,0,0,0,128,216a7.85,7.85,0,0,0,2.2-.31l106.2-30.34A16.07,16.07,0,0,0,248,170V86A16.07,16.07,0,0,0,236.4,70.65ZM96,120H80V62.94l40-5.72V198.78l-40-5.72V136H96a8,8,0,0,0,0-16ZM24,70.94l40-5.72V120H48a8,8,0,0,0,0,16H64v54.78l-40-5.72ZM136,197.39V58.61L232,86V170Z"></path></svg>
               <span className="pl-5">Contenedores</span>
            </li>
            <li className={`${styles} ${activeStyles}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256"><path d="M221.06,110.59,208,106.23V56a16,16,0,0,0-16-16H136V24a8,8,0,0,0-16,0V40H64A16,16,0,0,0,48,56v50.23l-13.06,4.36A16,16,0,0,0,24,125.77V152c0,61.54,97.89,86.72,102.06,87.76a8,8,0,0,0,3.88,0C134.11,238.72,232,213.54,232,152V125.77A16,16,0,0,0,221.06,110.59ZM64,56H192v44.9L130.53,80.41a8,8,0,0,0-5.06,0L64,100.9Zm152,96c0,24.91-23.68,43-43.55,53.83A228.13,228.13,0,0,1,128,223.72,226.85,226.85,0,0,1,83.81,206C47.6,186.35,40,165.79,40,152V125.77L120,99.1V168a8,8,0,0,0,16,0V99.1l80,26.67Z"></path></svg>
              <span className="pl-5">Buques</span>
            </li>
          </>
        );

      case 'gestor':
        return (
          <>
            <li className="w-full flex items-center mt-7 font-bold list-none hover:text-[#d2d3d3]">
              <i className="fa-solid fa-pen-to-square"></i>
              Órdenes
            </li>
            <li className="w-full flex items-center mt-7 font-bold list-none hover:text-[#d2d3d3]">
              <i className="fa-solid fa-truck-ramp-box"></i>
              Grúas
            </li>
            <li className="w-full flex items-center mt-7 font-bold list-none hover:text-[#d2d3d3]">
              <i className="fa-solid fa-square"></i>
              Contenedores
            </li>
            <li className="w-full flex items-center mt-7 font-bold list-none hover:text-[#d2d3d3]">
              <i className="fa-solid fa-ship"></i>
              Buques
            </li>
            <li className="w-full flex items-center mt-7 font-bold list-none hover:text-[#d2d3d3]">
              <i className="fa-solid fa-users"></i>
              Usuarios
            </li>
            <li className="w-full flex items-center mt-7 font-bold list-none hover:text-[#d2d3d3]">
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