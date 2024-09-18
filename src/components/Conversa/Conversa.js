import styles from "./Conversa.module.css";
import MsgEnviada from "../MsgEnviada/MsgEnviada";
import MsgRecebida from "../MsgRecebida/MsgRecebida";
import Carregando from "../Carregando/Carregando";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useState, useRef } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import api from "../../api";

import {
  sendMessage,
  receiveMessage,
  offReceiveMessage,
  leaveRoom,
} from "../../socket";
import { socket } from "../../socket";

export default function Conversa({ children }) {
  const [loading, setLoading] = useState(true);
  const { chatAtual, setChatAtual, messages, setMessages } =
    useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 0);
    }
  };

  async function buscarConversa(conversation_id) {
    try {
      const response = await api.get(`/messages/${conversation_id}`);
      setMessages(response.data.resultado);
      setLoading(false);
      setTimeout(() => {
        scrollToBottom();
      }, 0);
    } catch (error) {
      alert("Ocorreu um erro ao buscar a conversa:");
    }
  }

  useEffect(() => {
    if (chatAtual) {
      buscarConversa(chatAtual.conversation_id);
    }
  }, [chatAtual]);

  useEffect(() => {
    const addNovaMsg = (novaMensagem) => {
      setMessages((prevMensagens) => [...prevMensagens, novaMensagem]);
      const container = chatContainerRef.current;
      if (container) {
        const isScrolledToBottom =
          container.scrollHeight - container.scrollTop ===
          container.clientHeight;

        if (isScrolledToBottom) {
          scrollToBottom();
        }
      }
    };

    receiveMessage(addNovaMsg);

    return () => {
      offReceiveMessage();
    };
  }, [chatAtual]);

  useEffect(() => {}, []);

  function handleSubmit(e) {
    e.preventDefault();
    const message = e.target[0].value;
    e.target[0].value = "";
    const data = {
      message: message,
      recipient_id: chatAtual.contact_id,
      conversation_id: chatAtual.conversation_id,
      createdAt: new Date(),
    };
    sendMessage(data);
  }

  return (
    <>
      <div className={styles.conversa}>
        {loading ? (
          <Carregando />
        ) : (
          <div ref={chatContainerRef} className={styles.msgsTeste}>
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
        )}
        <form onSubmit={handleSubmit} className={styles.formMensagem}>
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
    </>
  );
}
