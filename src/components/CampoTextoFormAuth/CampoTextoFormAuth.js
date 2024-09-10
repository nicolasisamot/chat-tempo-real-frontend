import styles from "./CampoTextoFormAuth.module.css";

export default function CampoTextoFormAuth(props) {
  return (
    <label className={styles.label}>
      <span className={styles.titulo}>{props.label}</span>
      <input
        className={styles.input}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
      />
    </label>
  );
}
