import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import { getResponse } from "./bot";
import MessagingController from "./services/messaging";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (request: Request, response: Response) => {
  return response.send({ version: 1.0 });
});

app.post("/", MessagingController.receiveMessage);

app.listen(3000);
