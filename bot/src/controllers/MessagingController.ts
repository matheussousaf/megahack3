import { Request, Response } from "express";
import { getResponse } from "../services/bot";
import { useWhatsappService } from "src/services/whatsapp";
require("dotenv").config();

class MessagingController {
  static receiveMessage = async (request: Request, res: Response) => {
    const { Body, From } = request.body;

    const whatsappService = useWhatsappService();

    const response = await getResponse(Body);
    // to: "whatsapp:+558398949349",

    if (response.intent === "Default Welcome Intent") {
      whatsappService.sendMediaMessage(From, response.body, [
        "https://lh3.googleusercontent.com/MKFOXKJRiXkd1VfeU8qX38zjMnMmut3UppdYTXcOHKRkVvmfk-ECy7pd3de6kTz5Sq4=s180-rw",
      ]);
      return;
    }

    const parsedResponse = whatsappService.incomingMessageFromEndpoint(
      response.body
    );

    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(parsedResponse);
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
          "https://lh3.googleusercontent.com/MKFOXKJRiXkd1VfeU8qX38zjMnMmut3UppdYTXcOHKRkVvmfk-ECy7pd3de6kTz5Sq4=s180-rw",
        ]
      );
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
