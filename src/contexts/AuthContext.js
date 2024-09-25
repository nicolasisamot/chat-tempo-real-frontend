import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { connectSocket, disconnectSocket } from "../socket";

export const AuthContext = createContext();
AuthContext.displayName = "Auth";

export default function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = (token, user) => {
    setToken(token);
    setUser(user);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("authToken", `Bearer ${token}`);
    setIsAuthenticated(true);
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    api.defaults.headers.common["Authorization"] = null;
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      const decodedToken = jwtDecode(savedToken);
      setUser(decodedToken.user);
      setToken(savedToken);
      api.defaults.headers.common["Authorization"] = savedToken;
      let conexao = connectSocket()
        .then((socket) => {
          setIsAuthenticated(true);
        })
        .catch((error) => {
          setIsAuthenticated(false);
        });
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, logout, login, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
