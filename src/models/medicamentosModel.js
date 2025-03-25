import prisma from "../config/database.js";

class MedicamentosModel {
  createMedicamento = async (medicamento, res) => {
    try {
      const medicamentoCriado = await prisma.medicamentos.create({
        data: medicamento,
      });
      if (!medicamento) {
        return res.status(400).json({ message: "Erro ao criar medicamento" });
      }
      return res.status(201).json({ medicamentoCriado });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro no servidor", detalhe: error.message });
    }
  };

  listMedicamento = async (res) => {
    try {
      const medicamentos = await prisma.medicamentos.findMany();
      if (!medicamentos) {
        return res.status(400).json({ message: "Erro ao listar medicamento" });
      }
      return res.status(201).json({ medicamentos });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro no servidor", detalhe: error.message });
    }
  };

  deleteMedicamento = async (res, req) => {
    try {
      const medicamento = await prisma.medicamentos.findUnique({
        where: { id: req.body.id },
      });
      if (!medicamento) {
        return res.status(400).json({ message: "Erro ao buscar medicamento" });
      }

      await prisma.medicamentos.delete({ where: { id: req.body.id } });
      return res
        .status(201)
        .json({ sucesso: true, message: "Medicamento deletado" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro no servidor", detalhe: error.message });
    }
  };
}

export default MedicamentosModel;
