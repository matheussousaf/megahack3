import { Request, Response } from "express";
import twilio from 'twilio';
import { getResponse } from "../bot";
require("dotenv").config();

const MessagingResponse = require("twilio").twiml.MessagingResponse;

class MessagingController {
  static receiveMessage = async (request: Request, res: Response) => {
    const twiml = new MessagingResponse();
    const { Body } = request.body;

    const response = await getResponse(Body);

    twiml.message(response);
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  };

  static testReceive = async (request: Request, res: Response) => {
    const twiml = new MessagingResponse();
    const { message } = request.body;

    const response = await getResponse(message);

    twiml.message(response);
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  }

  static sendMessage = async (request: Request, res: Response) => {
    const { to, message } = request.body;

    if (!to || !message) {
      res.status(400).send({ response: "Wrong format, must be: to, message" });
      return;
    }

    const accountSid = process.env.TWILIO_SID;
    const token = process.env.TWILIO_TOKEN;

    const twilioClient = twilio(accountSid, token);

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
