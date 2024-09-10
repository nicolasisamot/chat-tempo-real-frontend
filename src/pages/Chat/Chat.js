import styles from "./Chat.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuConversas from "../../components/MenuConversas/MenuConversas";
import Conversa from "../../components/Conversa/Conversa";
export default function Chat(props) {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <MenuConversas />
      <Conversa />
    </>
  );
}
