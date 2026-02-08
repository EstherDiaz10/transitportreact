const MenuMovil = () => {
    
    return (
        <div class="lg:hidden">    
         <nav class="fixed inset-x-0 bottom-0 z-50 border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">      
            <ul class="grid grid-cols-4">        
                <li><a href="#" class="flex flex-col items-center py-2 text-sm hover:bg-gray-50">            
                    
                     <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">              
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
                    </svg>            
                    <span>Inicio</span>
                </a>        
            </li>        
            <li>
                <a href="#" class="flex flex-col items-center py-2 text-sm hover:bg-gray-50">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">              
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"                
                        d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />            
                    </svg>            
                    <span>Buscar</span>          
                </a>      
            </li>        
            <li>
                <a href="#" class="flex flex-col items-center py-2 text-sm hover:bg-gray-50">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">              
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A8 8 0 1118.88 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />            
                    </svg>            
                    <span>Perfil</span>          
                </a>        
            </li>        
            <li>          
                <a href="#" class="flex flex-col items-center py-2 text-sm hover:bg-gray-50">            
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">              
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