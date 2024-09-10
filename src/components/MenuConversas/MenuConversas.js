import styles from "./MenuConversas.module.css";
import CardContato from "../CardContato/CardContato";
import Carregando from "../Carregando/Carregando";
import { useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect } from "react";
import api from "../../api";

export default function MenuConversas() {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [contatos, setContatos] = useState([]);

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
    if (user) {
      buscarContatos();
    }
  }, [user]);

  return (
    <>
      <div className={styles.menuConversas}>
        {loading ? (
          <Carregando />
        ) : (
          <>
            {contatos.map((contato) => (
              <CardContato
                key={contato.id}
                fotoContato={"https://github.com/nicolasisamot.png"}
                nomeContato={contato.username}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}
