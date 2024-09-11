import styles from "./MsgRecebida.module.css";

export default function MsgRecebida(props) {
  return (
    <div className={styles.msgRecebida}>
      <span className={styles.titulo}>{props.enviadaPor}</span>
      <p className={styles.texto}>{props.texto}</p>
      <span className={styles.data}>{props.data}</span>
    </div>
  );
}
