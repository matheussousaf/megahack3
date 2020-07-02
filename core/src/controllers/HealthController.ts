import { Request, Response } from "express";

export class HealthController {
  static healthCheck = (req: Request, res: Response) => {
    res.send({message: "OK"})
  }
}
