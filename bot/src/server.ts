import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import MessagingController from "./services/messaging";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (request: Request, response: Response) => {
  return response.send({ version: 1.0 });
});

app.post("/", MessagingController.receiveMessage);

console.log(`Server running at port ${PORT}`);
app.listen(PORT);
