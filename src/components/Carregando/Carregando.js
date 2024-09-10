import styles from "./Carregando.module.css";

export default function Carregando({ children }) {
  return (
    <div className={styles.carregando}>
      <p className={styles.text}>Carregando...</p>
    </div>
  );
}
