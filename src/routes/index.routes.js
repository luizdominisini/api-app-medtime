import { Router } from "express";
import AuthControler from "../controllers/authController.js";
import MedicamentosController from "../controllers/medicamentosController.js";

import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = Router();
const authController = new AuthControler();
const medicamentosController = new MedicamentosController();

//Auth
router.post("/auth/cadastrar", authController.createUser);
router.get("/auth/listar", verifyToken, authController.listUsers);
router.post("/auth/login", authController.login);
router.get("/auth/verify-token", verifyToken, (req, res) => {
  res.status(200).json({ auth: true, message: "Token verificado" });
});
router.delete("/auth/deletar", verifyToken, authController.deleteUser);

//Medicamentos
router.post(
  "/med/cadastrar",
  verifyToken,
  medicamentosController.createMedicamento
);
router.get("/med/listar", verifyToken, medicamentosController.listMedicamento);
router.delete(
  "/med/delete",
  verifyToken,
  medicamentosController.deleteMedicamento
);

export default router;
