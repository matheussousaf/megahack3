import { Request, Response } from "express";
import twilio from "twilio";
import { getResponse } from "../services/bot";
require("dotenv").config();

const MessagingResponse = require("twilio").twiml.MessagingResponse;

class MessagingController {
  static receiveMessage = async (request: Request, res: Response) => {
    const twiml = new MessagingResponse();
    const { Body, From } = request.body;

    const accountSid = process.env.TWILIO_SID;
    const token = process.env.TWILIO_TOKEN;

    const twilioClient = twilio(accountSid, token);

    const response = await getResponse(Body);

    console.log(From);

    if (response.intent === "Default Welcome Intent") {
      twilioClient.messages.create({
        mediaUrl: [
          "https://lh3.googleusercontent.com/MKFOXKJRiXkd1VfeU8qX38zjMnMmut3UppdYTXcOHKRkVvmfk-ECy7pd3de6kTz5Sq4=s180-rw",
        ],
        from: "whatsapp:+14155238886",
        to: `${From}`,
        body: "Esse aqui sou euzinho! 😊",
      });
    }

    twiml.message(response.body);
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  };

  static testReceive = async (request: Request, res: Response) => {
    const twiml = new MessagingResponse();
    const { message } = request.body;

    const response = await getResponse(message);
    
    const accountSid = process.env.TWILIO_SID;
    const token = process.env.TWILIO_TOKEN;

    const twilioClient = twilio(accountSid, token);

    if (response.intent === "Default Welcome Intent") {
      twilioClient.messages.create({
        mediaUrl: [
          "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        ],
        from: "whatsapp:+14155238886",
        to: `whatsapp:+558398949349`,
        body: "Esse aqui sou euzinho!",
      });
    }

    twiml.message(response.body);
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  };

  static sendMessage = async (request: Request, res: Response) => {
    const { to, message } = request.body;

    const accountSid = process.env.TWILIO_SID;
    const token = process.env.TWILIO_TOKEN;

    const twilioClient = twilio(accountSid, token);

    if (!to || !message) {
      res.status(400).send({ response: "Wrong format, must be: to, message" });
      return;
    }
    // Sending message
    twilioClient.messages.create({
      from: "whatsapp:+14155238886",
      to: `whatsapp:+${to}`,
      body: message,
    });

    res.status(201).send({ message: message, status: "Message sent." });
  };
}

export default MessagingController;
