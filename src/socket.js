import { io } from "socket.io-client";

export let socket;

export const connectSocket = () => {
  const token = localStorage.getItem("authToken");

  socket = io("http://localhost:3001", {
    auth: {
      token,
    },
  });

  socket.on("connect", () => {
    console.log("Conectado com sucesso ao servidor!");
  });

  socket.on("disconnect", () => {
    console.log("Desconectado do servidor");
  });
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

export const joinRoom = (conversationId) => {
  socket.emit("joinRoom", { room: `room-${conversationId}` });
};

export const leaveRoom = (conversationId) => {
  socket.emit("leaveRoom", { room: `room-${conversationId}` });
};

export const sendMessage = (data) => {
  socket.emit("sendMessage", { room: `room-${data.conversation_id}`, data });
};

export const receiveMessage = (callback) => {
  if (socket) {
    console.log(socket);
    console.log("Socket foi inicializado corretamente.");
    socket.on("receiveMessage", (data) => {
      callback(data);
    });
  } else {
    console.error("Socket não foi inicializado corretamente.");
  }
};
export const offReceiveMessage = () => {
  if (socket) {
    socket.off("receiveMessage");
  } else {
    console.error("Socket não foi inicializado corretamente.");
  }
};

// const data = {
//   message: message,
//   recipient_id: chatAtual.contact_id,
//   conversation_id: chatAtual.conversation_id,
//   //sender_id: user.id, //backend ja verifica inseri quem enviou por meio do token
// };
