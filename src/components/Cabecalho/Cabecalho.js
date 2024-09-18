import styles from "./Cabecalho.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalAdicionarUsuario from "../ModalAdicionarUsuario/ModalAdicionarUsuario";

export default function Cabecalho({ children }) {
  const { logout, isAuthenticated } = useContext(AuthContext);
  const [isModalAdicionarOpen, setIsModalAdicionarOpen] = useState(false);
  const navigate = useNavigate();

  const handleModalAdicionar = () => {
    setIsModalAdicionarOpen(!isModalAdicionarOpen);
  };

  return (
    <>
      <header className={styles.cabecalho}>
        {isAuthenticated ? (
          <>
            {isModalAdicionarOpen && (
              <ModalAdicionarUsuario
                handleModalAdicionar={handleModalAdicionar}
              />
            )}
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Sair
            </button>
          </>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
        <span onClick={handleModalAdicionar}>x</span>
      </header>
      {children}
    </>
  );
}

// (
//   <button
//     onClick={() => {
//       logout();
//       navigate("/");
//     }}
//   >
//     Sair
//   </button>
// )
