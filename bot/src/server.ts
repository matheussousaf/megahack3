import express from "express";

const app = express();

app.get("/", (request, response) => {
  return response.send({ message: "Hello" });
});

app.listen(3000);
