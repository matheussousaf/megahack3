
import { Router, Request, Response } from "express";
import { HealthController } from "@controllers/HealthController";

const routes = Router();

routes.get("/", HealthController.healthCheck);

// routes.use("/auth", auth);

export default routes;