import socket from "socket.io";
import { getResponse } from "./bot";

interface Body {
  text: string;
  media: string[];
}

interface Media {
  content: object;
  type: string;
}

interface Message {
  text: string;
  media: Media | {};
}

export const useSocket = (app: any, port: string) => {
  const http = require("http").createServer(app);
  const io = socket(http);

  io.on("connection", (socket) => {
    console.log("Um usuário foi conectado");
    socket.emit("testEvent", "Massa");

    socket.on("message", async (message: Body) => {
      console.log("Mensagem que chegou: ", message);

      try {
        if (message.text) {
          const response = await getResponse(message.text);
          let content: Message = {
            text: response.body,
            media: {},
          };

          if (response.intent === "Make an Activity") {
            console.log("Opa");
            content.media = {
              type: "question",
              subject: "Matemática",
              question: "Quanto é 2 mais 3",
              alternatives: ["A) 2", "B) 3", "C) 4", "D) 5"],
              answer: 3
            };
          }

          socket.emit("response", content);
        }
      } catch (error) {
        console.log(error);
      }
    });
  });

  http.listen(+port, () => {
    console.log(`Ouvindo na porta: ${3336}`);
  });
};
