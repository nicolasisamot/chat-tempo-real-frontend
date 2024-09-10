import styles from "./CardContato.module.css";

export default function CardContato({ fotoContato, nomeContato, children }) {
  return (
    <div className={styles.cardContato}>
      <picture className={styles.foto}>
        <img src={fotoContato}></img>
      </picture>
      <span>{nomeContato}</span>
    </div>
  );
}
