import styles from "./ModalAdicionarUsuario.module.css";
import CardContato from "../CardContato/CardContato";
import { useEffect, useState } from "react";
import api from "../../api";

export default function ModalAdicionarUsuario(props) {
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
    <div className={styles.modalAdicionarUsuario}>
      <span onClick={() => props.handleModalAdicionar()}> X </span>
      <div className={styles.modalContent}>
        <h1>Adicionar Usuário</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="nome">username</label>
            <input type="text" name="nome" id="nome" minlength="3" />
            <button type="submit">buscar</button>
          </form>
        </div>
      </div>
      <>
        {contatos.map((contato) => {
          return (
            <div key={contato.id}>
              <CardContato
                width="95%"
                height="8rem"
                nomeContato={contato.username}
                fotoContato={"https://github.com/nicolasisamot.png"}
                isContact={contato.isContact}
              />
            </div>
          );
        })}
      </>
    </div>
  );
}
