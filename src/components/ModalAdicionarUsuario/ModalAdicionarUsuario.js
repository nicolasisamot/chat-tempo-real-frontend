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
    const search = e.target[0].value;

    if (search.length > 2) {
      buscarContatos(search);
    }
  }
  return (
    <div className={styles.modalAdicionarUsuario}>
      <img
        className={styles.close}
        src={"./close.png"}
        onClick={() => props.handleModalAdicionar()}
      ></img>
      <div className={styles.modalContent}>
        <h3 className={styles.titulo}>Adicionar Usuário</h3>
        <div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input type="text" name="nome" id="nome" minlength="3" />
            <button type="submit">buscar</button>
          </form>
        </div>
      </div>
      <div className={styles.contatos}>
        {contatos.map((contato) => {
          if (contato.isContact == true) {
            return (
              <div key={contato.id}>
                <CardContato
                  idContato={contato.id}
                  width="100%"
                  height="8rem"
                  adicionar={false}
                  nomeContato={contato.username}
                  fotoContato={"https://github.com/nicolasisamot.png"}
                  isContact={contato.isContact}
                />
              </div>
            );
          } else {
            return (
              <div key={contato.id}>
                <CardContato
                  idContato={contato.id}
                  width="100%"
                  height="8rem"
                  adicionar={true}
                  nomeContato={contato.username}
                  fotoContato={"https://github.com/nicolasisamot.png"}
                  isContact={contato.isContact}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
