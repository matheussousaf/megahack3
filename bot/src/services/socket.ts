import socket from "socket.io";
import { getResponse } from "./bot";

interface Body {
  text: string;
  media: string[];
}

export const useSocket = (app: any, port: string) => {
  const http = require("http").createServer(app);
  const io = socket(http);

  io.on("connection", (socket) => {
    console.log("Um usuário foi conectado");
    socket.emit("testEvent", "Massa");

    socket.on("message", async (message: Body) => {
      console.log("Mensagem que chegou: ", message);

      const response = await getResponse(message.text);
      console.log(response);

      socket.emit("response", response);
    });
  });

  http.listen(+port, () => {
    console.log(`Ouvindo na porta: ${3336}`);
  });
};
