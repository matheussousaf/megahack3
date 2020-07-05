import { Router, Request, Response } from "express";
import MessagingController from "@controllers/MessagingController";

const router = Router();

router.get("/", (request: Request, response: Response) =>
  response.send({ version: 1.0 })
);

router.post("/", MessagingController.receiveMessage);

router.post("/send", MessagingController.sendMessage);

router.post("/test", MessagingController.testReceive);

export default router;
