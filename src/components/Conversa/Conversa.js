import styles from "./Conversa.module.css";
import MsgEnviada from "../MsgEnviada/MsgEnviada";
import MsgRecebida from "../MsgRecebida/MsgRecebida";
import Carregando from "../Carregando/Carregando";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
export default function Conversa({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.conversa}>
      {loading ? (
        <Carregando />
      ) : (
        <>
          <div className={styles.msgsTeste}>
            <MsgEnviada />
            <MsgRecebida />
            <MsgEnviada />
            <MsgEnviada />
          </div>
        </>
      )}

      <form className={styles.formMensagem}>
        <input
          className={styles.campoMensagem}
          type="text"
          placeholder="Escreva sua mensagem"
        />
        <button className={styles.botao} type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}
