import styles from "./Conversa.module.css";
import MsgEnviada from "../MsgEnviada/MsgEnviada";
import MsgRecebida from "../MsgRecebida/MsgRecebida";
import Carregando from "../Carregando/Carregando";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import api from "../../api";

export default function Conversa({ children }) {
  const [loading, setLoading] = useState(true);
  const { chatAtual, setChatAtual, messages, setMessages } =
    useContext(ChatContext);
  const { user } = useContext(AuthContext);

  async function buscarConversa(conversation_id) {
    try {
      const response = await api.get(`/messages/${conversation_id}`);
      setMessages(response.data.resultado);
      setLoading(false);
    } catch (error) {
      alert("Ocorreu um erro ao buscar a conversa:");
    }
  }

  useEffect(() => {
    if (chatAtual) {
      buscarConversa(chatAtual.conversation_id);
      setLoading(false);
    }
  }, [chatAtual]);

  return (
    <div className={styles.conversa}>
      {loading ? (
        <Carregando />
      ) : (
        <>
          <div className={styles.msgsTeste}>
            {messages.map((msg) => {
              if (msg.sender_id == user.id) {
                return (
                  <MsgEnviada
                    key={msg.id}
                    texto={msg.message}
                    data={msg.createdAt}
                  />
                );
              } else {
                return (
                  <MsgRecebida
                    key={msg.id}
                    enviadaPor={chatAtual.username}
                    texto={msg.message}
                    data={msg.createdAt}
                  />
                );
              }
            })}
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
