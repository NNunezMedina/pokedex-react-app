import { createContext, useContext, useEffect, useState } from "react";
import { tokenKey } from "../cofig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const token = sessionStorage.getItem(tokenKey);

    useEffect(() => {
        const options = {
            method: 'GET', 
            headers: {Authorization: `Bearer ${token}`}
        };
        fetch('https://poke-collection-api-production.up.railway.app//profile', options)
        .then(response => response.json())
        .then(response => {
            const {_token, ...user} = response;
            setUser(user)
        })
        .catch(err => console.error(err));
    },[]);

    const login = (userData, token) => {
        setUser(userData);
        sessionStorage.setItem('authToken', token);
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('authToken');
    }

    return (
        <AuthContext.Provider value={{ user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}