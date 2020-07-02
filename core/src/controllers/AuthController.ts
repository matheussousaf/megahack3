import { Request, Response } from "express";
import { User } from "@entities/User";
import config from "@config/config";
import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import { validate } from "class-validator";

export class AuthController {
  static list = (req: Request, res: Response) => {
    const userRepository = getRepository(User);

    const users = userRepository.find();

    res.send(users);
  };

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userRepository = getRepository(User);

    try {
      const user = await userRepository.findOneOrFail({
        where: { email },
      });

      if (!(await user).checkIfUnencryptedPasswordIsValid(password)) {
        res.status(401).send({ response: "Wrong credentials." });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        config.jwtSecret,
        { expiresIn: "24h" }
      );

      res.send({
        email,
        token,
      });
    } catch (error) {
      res.status(401).send({ response: "Wrong credentials." });
    }
  };

  static changePassword = async (req: Request, res: Response) => {
    const id = res.locals.jwtPayload.userId;

    const { oldPassword, newPassword, type } = req.body;

    if (!(oldPassword && newPassword && type)) {
      res.status(400).send({
        response:
          "Wrong data, format needs to be: oldPassword, newPassword, type.",
      });
    }

    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send({ response: "Wrong credentials." });
    }

    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send({ response: "Wrong credentials." });
      return;
    }

    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send({ response: `Wrong Formatting: ${errors}` });
      return;
    }

    user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  };
}
