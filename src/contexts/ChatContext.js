import { createContext, useEffect, useState } from "react";

export const ChatContext = createContext();
ChatContext.displayName = "Chat";

export default function ChatContextProvider({ children }) {
  const [chatAtual, setChatAtual] = useState(null);
  const [messages, setMessages] = useState([]);
  const [solicitacoesPendentes, setSolicitacoesPendentes] = useState([]);

  return (
    <ChatContext.Provider
      value={{
        chatAtual,
        setChatAtual,
        messages,
        setMessages,
        solicitacoesPendentes,
        setSolicitacoesPendentes,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
