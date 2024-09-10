import styles from "./MsgRecebida.module.css";

export default function MsgRecebida() {
  return (
    <div className={styles.msgRecebida}>
      <span className={styles.titulo}>Nicolas</span>
      <p className={styles.texto}>
        Lorem Ipsum is simply dummy text of the printing.
      </p>
    </div>
  );
}
