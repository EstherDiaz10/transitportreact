import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch("http://localhost:8000/api/me", {
            headers: {Authorization: `Bearer ${token}`},
        })
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(() => setUser(null));
    }, []);

    return ( 
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )  
}