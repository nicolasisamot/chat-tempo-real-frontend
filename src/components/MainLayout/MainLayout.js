import Cabecalho from "../Cabecalho/Cabecalho";

export default function MainLayout({ children }) {
  return (
    <main>
      <Cabecalho />
      {children}
    </main>
  );
}
