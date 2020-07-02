import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import routes from "@routes/index";

createConnection()
  .then(async (connection) => {
    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use("/", routes);

    app.listen(3333, () => {
      console.log("Server started on port 3333!");
    });
  })
  .catch((error) => console.log(error));
