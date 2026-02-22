import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react'; 
import { AuthContext } from '../context/AuthProvider'; 

const RutasProtegidas = () => {
  
    const { user } = useContext(AuthContext); 

    return user ? <Outlet /> : <Navigate to="/welcome" replace />;
}

export default RutasProtegidas;