import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const userGuardado = localStorage.getItem("user");
    const [user, setUser] = useState(userGuardado ? JSON.parse(userGuardado) : null);

    return ( 
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )  
}