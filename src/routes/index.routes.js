import { Router } from "express";
import AuthControler from "../controllers/authController.js";

const router = Router();
const authController = new AuthControler();

//Users
router.post(
  "/auth/cadastrar",
  authController.verifyJwt,
  authController.createUser
);
router.get("/auth/listar", authController.verifyJwt, authController.listUsers);
router.post("/auth/login", authController.login);

export default router;
