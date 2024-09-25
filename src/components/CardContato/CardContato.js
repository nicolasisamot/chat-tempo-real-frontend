import styles from "./CardContato.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { sendFriendRequest } from "../../socket";

export default function CardContato({
  width = "95%",
  height = "8rem",
  onClick,
  fotoContato,
  nomeContato,
  idContato,
  children,
  solicitacao = false,
  adicionar = false,
  isContact = true,
}) {
  const { user } = useContext(AuthContext);
  const tamanho = { width, height };

  function handleAddUser(e, idContato) {
    sendFriendRequest({ recipient_id: idContato });
  }

  return (
    <div className={styles.cardContato} style={tamanho} onClick={onClick}>
      <div className={styles.infoContato}>
        <picture className={styles.foto}>
          <img src={fotoContato}></img>
        </picture>
        <span className={styles.nomeContato}>{nomeContato}</span>
      </div>

      <picture className={styles.botao}>
        {isContact && <img src={"./friends.png"}></img>}
        {adicionar && (
          <img
            onClick={(e) => handleAddUser(e, idContato)}
            src={"./add-user.png"}
          ></img>
        )}
        {solicitacao && (
          <div className={styles.solicitacao}>
            <img src={"./reject.png"}></img>
            <img src={"./accept.png"}></img>
          </div>
        )}
      </picture>
    </div>
  );
}

// return (
//   <div className={styles.cardContato} style={tamanho} onClick={onClick}>
//     <div className={styles.infoContato}>
//       <picture className={styles.foto}>
//         <img src={fotoContato}></img>
//       </picture>
//       <span className={styles.nomeContato}>{nomeContato}</span>
//     </div>

//     <picture className={styles.botao}>
//       {isContact ? (
//         <img src={"./friends.png"}></img>
//       ) : (
//         <img
//           src={"./add-user.png"}
//           onClick={(e) => handleAddUser(e, idContato)}
//         ></img>
//       )}
//     </picture>
//   </div>
// );
