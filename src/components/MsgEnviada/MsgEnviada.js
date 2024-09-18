import styles from "./MsgEnviada.module.css";
import moment from "moment";
import "moment/locale/pt-br";

export default function MsgEnviada(props) {
  const dataFormatada = moment(props.data)
    .locale("pt-br")
    .format("DD/MM/YYYY HH:mm");
  return (
    <div className={styles.msgEnviada}>
      <p className={styles.texto}>{props.texto}</p>
      <span className={styles.data}>{dataFormatada}</span>
    </div>
  );
}
