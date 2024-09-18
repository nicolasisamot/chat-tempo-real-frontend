import styles from "./CardContato.module.css";

export default function CardContato({
  width = "95%",
  height = "8rem",
  onClick,
  fotoContato,
  nomeContato,
  children,
  isContact = true,
}) {
  const tamanho = { width, height };
  return (
    <div className={styles.cardContato} style={tamanho} onClick={onClick}>
      <picture className={styles.foto}>
        <img src={fotoContato}></img>
      </picture>
      <span className={styles.nomeContato}>{nomeContato}</span>
      <picture className={styles.foto}>
        <img src={isContact ? "./friends.png" : "./add-user.png"}></img>
      </picture>
    </div>
  );
}
