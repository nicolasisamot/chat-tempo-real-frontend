import { io } from "socket.io-client";

export let socket;

export const connectSocket = async () => {
  const abc = new Promise((resolve, reject) => {
    const token = localStorage.getItem("authToken");

    socket = io("http://localhost:3001", {
      auth: {
        token,
      },
    });

    socket.on("connect", () => {
      resolve(socket);
      console.log("Conectado ao servidor");
    });

    socket.on("connect_error", (error) => {
      reject(error);
      console.log("Erro ao conectar ao servidor");
    });
  });
  socket.on("disconnect", () => {
    console.log("Desconectado do servidor");
  });
  return abc;
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
    console.log("recebendo solicitacoes");
    socket.on("receiveMessage", (data) => {
      callback(data);
    });
  }
};
export const offReceiveMessage = () => {
  if (socket) {
    socket.off("receiveMessage");
  }
};

export const sendFriendRequest = (data) => {
  socket.emit("sendFriendRequest", data);
  console.log("friend request sent");
};

export const receiveFriendRequest = (callback) => {
  if (socket) {
    console.log("recebendo solicitacoes");
    socket.on("receiveFriendRequest", (data) => {
      callback(data);
    });
  }
};

export const offReceiveFriendRequest = () => {
  if (socket) {
    socket.off("receiveFriendRequest");
  }
};

export const getSocket = () => {
  return socket;
};

//receiveFriendRequest

// const data = {
//   message: message,
//   recipient_id: chatAtual.contact_id,
//   conversation_id: chatAtual.conversation_id,
//   //sender_id: user.id, //backend ja verifica inseri quem enviou por meio do token
// };
