// src/routes/medicamentos.routes.js
import { Router } from "express";
import MedicamentosController from "../controllers/medicamento.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = Router();
const medicamentosController = new MedicamentosController();

router.post(
  "/cadastrar",
  verifyToken,
  medicamentosController.cadastrarMedicamento
);
router.get("/listar", verifyToken, medicamentosController.listarMedicamento);
router.delete(
  "/delete",
  verifyToken,
  medicamentosController.deletarMedicamento
);
router.put(
  "/atualizar",
  verifyToken,
  medicamentosController.atualizarMedicamento
);

export default router;
