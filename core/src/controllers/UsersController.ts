import { Request, Response } from "express";
import { User } from "@entities/User";
import config from '@config/config'; 
import { getRepository } from 'typeorm';

export class UserController {
  static list = (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    
    const users = userRepository.find();

    res.send(users)
  }
}
