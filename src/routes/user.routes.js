import { Router } from "express";
import UserController from "../controllers/userController.js";

const router = Router();
const userController = new UserController();

router.post("/user/cadastrar", userController.createUserController);

export default router;
