import { createContext, useContext, useEffect, useState } from "react";
import { tokenKey } from "../cofig";
import { fetchUserProfile } from "../services/api-fetch";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = sessionStorage.getItem(tokenKey);

  useEffect(() => {
    if (!token) return;

    fetchUserProfile(token)
      .then((response) => {
        const { _token, ...user } = response;
        setUser(user);
      })
      .catch((err) => console.error(err));
  }, [token]);

  const login = (userData, token) => {
    setUser(userData);
    sessionStorage.setItem(tokenKey, token);
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem(tokenKey);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
