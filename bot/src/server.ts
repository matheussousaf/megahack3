import express, { Request, Response } from "express";
import { getResponse } from "./bot";

const app = express();

app.get("/", (request: Request, response: Response) => {
  return response.send({ version: 1.0 });
});

app.post("/", (request: Request, response: Response) => {
  console.log(request.body);

  //   const botResponse = await getResponse(message);

  //   console.log(botResponse);

  return response.send({ message: "oi bixo" });
});

app.listen(3000);
