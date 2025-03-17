import { Router } from "express";
import AuthControler from "../controllers/authController.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = Router();
const authController = new AuthControler();

//Auth
router.post("/auth/cadastrar", authController.createUser);
router.get("/auth/listar", verifyToken, authController.listUsers);
router.post("/auth/login", authController.login);

export default router;
