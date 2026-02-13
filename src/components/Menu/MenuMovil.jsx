const MenuMovil = () => {
    
    return (
        <div className="lg:hidden">    
         <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-[#2A5677]">      
            <ul className="grid grid-cols-4">        
                <li>            
                    <NavLink to="/misOrdenes" className={({isActive}) => `${styles} ${isActive ? activeStyles : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,58.34l-32-32a8,8,0,0,0-11.32,0l-96,96A8,8,0,0,0,88,128v32a8,8,0,0,0,8,8h32a8,8,0,0,0,5.66-2.34l96-96A8,8,0,0,0,229.66,58.34ZM124.69,152H104V131.31l64-64L188.69,88ZM200,76.69,179.31,56,192,43.31,212.69,64ZM224,128v80a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h80a8,8,0,0,1,0,16H48V208H208V128a8,8,0,0,1,16,0Z"></path></svg>
                        <span className="pl-5">Órdenes</span>
                    </NavLink>       
                </li>        
            <li>
                <a href="#" className="flex flex-col items-center py-2 text-sm hover:bg-gray-50">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">              
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"                
                        d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />            
                    </svg>            
                    <span>Buscar</span>          
                </a>      
            </li>        
            <li>
                <a href="#" className="flex flex-col items-center py-2 text-sm hover:bg-gray-50">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">              
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A8 8 0 1118.88 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />            
                    </svg>            
                    <span>Perfil</span>          
                </a>        
            </li>        
            <li>          
                <a href="#" className="flex flex-col items-center py-2 text-sm hover:bg-gray-50">            
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">              
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"                
                        d="M10.325 4.317a1 1 0 011.35-.436l7.5 3.75a1 1 0 01.558.894v6.95a1 1 0 01-.558.894l-7.5 3.75a1 1 0 01-1.35-.447l-3.5-7a1 1 0 010-.894l3.5-7z" />            
                    </svg>            
                    <span>Ajustes</span>          
                </a>        
            </li>      
        </ul>     
        </nav> 
        </div>
    )
}

export default MenuMovil;