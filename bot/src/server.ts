import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import MessagingController from "@controllers/MessagingController";

require("dotenv").config();

const app = express();
const { PORT } = process.env;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (request: Request, response: Response) =>
  response.send({ version: 1.0 })
);

app.post("/", MessagingController.receiveMessage);

app.post("/send", MessagingController.sendMessage);

app.post("/test", MessagingController.testReceive);

app.listen(PORT || 3334);
console.log(`Server running at port ${PORT || 3334}`);
