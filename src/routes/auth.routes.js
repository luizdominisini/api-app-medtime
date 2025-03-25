// src/routes/auth.routes.js
import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = Router();
const authController = new AuthController();

router.post("/cadastrar", authController.cadastrarUsuario);
router.get("/listar", verifyToken, authController.listarUsuario);
router.post("/login", authController.login);
router.get("/verify-token", verifyToken, (req, res) => {
  res.status(200).json({ auth: true, message: "Token verificado" });
});
router.delete("/deletar", verifyToken, authController.deletarUsuario);

export default router;
