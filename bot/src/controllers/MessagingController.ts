import { Request, Response } from "express";
import { getResponse } from "@services/bot";
import { useWhatsappService } from "@services/whatsapp";
require("dotenv").config();

class MessagingController {
  static receiveMessage = async (request: Request, res: Response) => {
    try {
      const { Body, From } = request.body;

      const whatsappService = useWhatsappService();

      const response = await getResponse(Body);

      if (response.intent === "Default Welcome Intent") {
        whatsappService.sendMediaMessage(From, response.body, [
          "https://static.intercomassets.com/avatars/1980366/square_128/Ottos_para_whatsapp-01-1561732255.png?1561732255",
        ]);
        res.status(204).send();
        return;
      }

      const parsedResponse = whatsappService.incomingMessageFromEndpoint(
        response.body
      );

      res.writeHead(200, { "Content-Type": "text/xml" });
      res.end(parsedResponse);
    } catch (error) {
      console.log(error);
    }
  };

  static testReceive = async (request: Request, res: Response) => {
    const { message } = request.body;

    const whatsappService = useWhatsappService();

    const response = await getResponse(message);
    // to: "whatsapp:+558398949349",

    if (response.intent === "Default Welcome Intent") {
      whatsappService.sendMediaMessage(
        "whatsapp:+558398949349",
        response.body,
        [
          "https://static.intercomassets.com/avatars/1980366/square_128/Ottos_para_whatsapp-01-1561732255.png?1561732255",
        ]
      );
      res.status(204).send();
      return;
    }

    const parsedResponse = whatsappService.incomingMessageFromEndpoint(
      response.body
    );

    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(parsedResponse);
  };

  static sendMessage = async (request: Request, res: Response) => {
    const { to, message } = request.body;

    const whatsappService = useWhatsappService();

    if (!to || !message) {
      res.status(400).send({ response: "Wrong format, must be: to, message" });
      return;
    }

    whatsappService.sendMessage(`whatsapp:+${to}`, message);

    res.status(201).send({ message: message, status: "Message sent." });
  };
}

export default MessagingController;
