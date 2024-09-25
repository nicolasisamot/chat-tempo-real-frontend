import styles from "./Chat.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuConversas from "../../components/MenuConversas/MenuConversas";
import Conversa from "../../components/Conversa/Conversa";
import ChatContextProvider from "../../contexts/ChatContext";
import { connectSocket, disconnectSocket } from "../../socket";

export default function Chat(props) {
  return (
    <>
      <MenuConversas />
      <Conversa />
    </>
  );
}
