import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import { useSocket } from "@services/socket";
import routes from "@routes/index";

require("dotenv").config();
const app = express();

const { PORT } = process.env;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", routes);

useSocket(app, PORT);
