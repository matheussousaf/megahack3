import { Request, Response } from "express";
import { getResponse } from "../bot";

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
}

export default MessagingController;
