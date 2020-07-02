
import { Router, Request, Response } from "express";
import { HealthController } from "@controllers/HealthController";
import auth from './auth';

const routes = Router();

routes.get("/", HealthController.healthCheck);

routes.use("/user", auth);

export default routes;