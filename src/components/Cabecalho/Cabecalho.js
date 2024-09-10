import styles from "./Cabecalho.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Cabecalho({ children }) {
  const { logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <header className={styles.cabecalho}>
        {isAuthenticated ? (
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Sair
          </button>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </header>
      {children}
    </>
  );
}
