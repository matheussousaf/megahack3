import { Router } from "express";
// import UsersController from "@controllers/UsersController";
import { checkJwt } from "../middlewares/checkJwt";
import { UserController } from "@controllers/UsersController";
import { AuthController } from "@controllers/AuthController";

const router = Router();

router.get("/", UserController.list);
router.post("/register", UserController.create);
router.post("/login", AuthController.login);

export default router;