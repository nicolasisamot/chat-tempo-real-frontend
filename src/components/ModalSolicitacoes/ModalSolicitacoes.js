import styles from "./ModalSolicitacoes.module.css";
import CardContato from "../CardContato/CardContato";
import { useEffect, useState } from "react";
import api from "../../api";

export default function ModalSolicitacoes(props) {
  const [contatos, setContatos] = useState([]);

  async function buscarContatos(search) {
    try {
      console.log(search);
      const response = await api.get(`/users/q?`, {
        params: { username: search },
      });
      const resultado = response.data.resultado;
      setContatos(resultado);
    } catch (error) {
      alert("Ocorreu um erro ao buscar os contatos:");
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    buscarContatos(e.target[0].value);
  }

  return (
    <div className={styles.ModalSolicitacoes}>
      <img
        className={styles.close}
        src={"./close.png"}
        onClick={() => props.handleModalSolicitacoes()}
      ></img>
      <h3 className={styles.titulo}>Convites de amizade</h3>
      <div className={styles.contatos}>
        <CardContato
          idContato={5}
          width="100%"
          height="8rem"
          adicionar={false}
          solicitacao={true}
          nomeContato={"arthur"}
          fotoContato={"https://github.com/nicolasisamot.png"}
          isContact={false}
        />
      </div>
    </div>
  );
}
