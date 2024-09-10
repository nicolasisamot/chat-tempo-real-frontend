import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api";

export const AuthContext = createContext();
AuthContext.displayName = "Auth";

export default function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = (token, user) => {
    setToken(token);
    setUser(user);
    setIsAuthenticated(true);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("authToken", `Bearer ${token}`);
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    api.defaults.headers.common["Authorization"] = null;
    localStorage.removeItem("authToken");
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      const decodedToken = jwtDecode(savedToken);
      setUser(decodedToken.user);
      setToken(savedToken);
      api.defaults.headers.common["Authorization"] = savedToken;
      setIsAuthenticated(true);
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
