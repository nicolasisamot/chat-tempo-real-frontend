import styles from "./Cabecalho.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalAdicionarUsuario from "../ModalAdicionarUsuario/ModalAdicionarUsuario";
import ModalSolicitacoes from "../ModalSolicitacoes/ModalSolicitacoes";
import {
  getSocket,
  offReceiveFriendRequest,
  receiveFriendRequest,
} from "../../socket";

export default function Cabecalho({ children }) {
  const { solicitacoesPendentes, setSolicitacoesPendentes } =
    useContext(ChatContext);
  const { logout, isAuthenticated, user } = useContext(AuthContext);
  const [isModalAdicionarOpen, setIsModalAdicionarOpen] = useState(false);
  const [isModalSolicitacoesOpen, setIsModalSolicitacoesOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      receiveFriendRequest((data) => {
        setSolicitacoesPendentes((prevSolicitacoesPendentes) => [
          ...prevSolicitacoesPendentes,
          data,
        ]);
      });
    }

    return () => {
      offReceiveFriendRequest();
    };
  }, [isAuthenticated]);

  const handleModalAdicionar = () => {
    if (isModalSolicitacoesOpen) {
      setIsModalSolicitacoesOpen(false);
    }
    setIsModalAdicionarOpen(!isModalAdicionarOpen);
  };

  const handleModalSolicitacoes = () => {
    if (isModalAdicionarOpen) {
      setIsModalAdicionarOpen(false);
    }
    setIsModalSolicitacoesOpen(!isModalSolicitacoesOpen);
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
            {isModalSolicitacoesOpen && (
              <ModalSolicitacoes
                handleModalSolicitacoes={handleModalSolicitacoes}
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
        <div>
          <img
            className={styles.icone}
            src="./friend-request.png"
            onClick={handleModalAdicionar}
          ></img>
          <img
            className={styles.icone}
            src="./envelope.png"
            onClick={handleModalSolicitacoes}
          ></img>
        </div>
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
