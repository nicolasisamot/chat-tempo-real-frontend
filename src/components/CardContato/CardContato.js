import styles from "./CardContato.module.css";

export default function CardContato({
  onClick,
  fotoContato,
  nomeContato,
  children,
}) {
  return (
    <div className={styles.cardContato} onClick={onClick}>
      <picture className={styles.foto}>
        <img src={fotoContato}></img>
      </picture>
      <span>{nomeContato}</span>
    </div>
  );
}
