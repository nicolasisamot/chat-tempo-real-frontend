import styles from "./MenuConversas.module.css";
import CardContato from "../CardContato/CardContato";
import Carregando from "../Carregando/Carregando";
import { useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect } from "react";
import api from "../../api";
import { ChatContext } from "../../contexts/ChatContext";
import {
  connectSocket,
  disconnectSocket,
  joinRoom,
  leaveRoom,
} from "../../socket";
import CampoPesquisa from "../CampoPesquisa/CampoPesquisa";

export default function MenuConversas() {
  const [loading, setLoading] = useState(true);
  const { user, token } = useContext(AuthContext);
  const { chatAtual, setChatAtual, messages, setMessages } =
    useContext(ChatContext);
  const [contatos, setContatos] = useState([]);
  const [search, setSearch] = useState("");

  async function buscarContatos() {
    try {
      const response = await api.get(`/contatos/${user.id}`);
      const resultado = response.data.resultado;
      setContatos(resultado);
      setLoading(false);
    } catch (error) {
      alert("Ocorreu um erro ao buscar os contatos:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user && token) {
      buscarContatos();
    }

    return () => {};
  }, [user]);

  const contatosFiltrados =
    search.length > 0
      ? contatos.filter((contato) =>
          contato.username.toLowerCase().includes(search.toLowerCase())
        )
      : contatos;

  return (
    <>
      <div className={styles.menuConversas}>
        <div className={styles.containerCampoPesquisa}>
          <CampoPesquisa
            placeholder="Pesquisar..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {loading ? (
          <Carregando />
        ) : (
          <>
            {contatosFiltrados.map((contato) => (
              <CardContato
                key={contato.id}
                fotoContato={"https://github.com/nicolasisamot.png"}
                nomeContato={contato.username}
                idContato={"sou o user"} //ADD
                onClick={() => {
                  if (chatAtual?.conversation_id) {
                    leaveRoom(chatAtual.conversation_id);
                  }
                  setMessages([]);
                  joinRoom(contato.conversation_id);
                  setChatAtual({
                    contact_id: contato.id,
                    conversation_id: contato.conversation_id,
                    username: contato.username,
                  });
                }}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}
