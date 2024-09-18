import styles from "./MsgRecebida.module.css";
import moment from "moment";
import "moment/locale/pt-br";

export default function MsgRecebida(props) {
  const dataFormatada = moment(props.data)
    .locale("pt-br")
    .format("DD/MM/YYYY HH:mm");

  return (
    <div className={styles.msgRecebida}>
      <span className={styles.titulo}>{props.enviadaPor}</span>
      <p className={styles.texto}>{props.texto}</p>
      <span className={styles.data}>{dataFormatada}</span>
    </div>
  );
}
