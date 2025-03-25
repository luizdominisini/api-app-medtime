// src/routes.js
import { Router } from "express";
import authRoutes from "./routes/auth.routes.js";
import medicamentosRoutes from "./routes/medicamento.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/med", medicamentosRoutes);

export default router;
