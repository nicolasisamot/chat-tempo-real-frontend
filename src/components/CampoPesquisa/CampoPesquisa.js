import styles from "./CampoPesquisa.module.css";

export default function CampoPesquisa(props) {
  return (
    <input
      className={styles.campoPesquisa}
      type="text"
      placeholder="Pesquisar..."
      onChange={(e) => props.onChange(e)}
    />
  );
}
