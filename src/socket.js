import { io } from "socket.io-client";

let socket;

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
