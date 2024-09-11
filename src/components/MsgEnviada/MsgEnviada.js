import styles from "./MsgEnviada.module.css";

export default function MsgEnviada(props) {
  return (
    <div className={styles.msgEnviada}>
      <p className={styles.texto}>{props.texto}</p>
      <span className={styles.data}>{props.data}</span>
    </div>
  );
}
