import prisma from "../config/database.js";

class MedicamentosModel {
  cadastrarMedicamento = async (medicamento, res) => {
    try {
      const medicamentoCriado = await prisma.medicamentos.create({
        data: medicamento,
      });
      if (!medicamento) {
        return res
          .status(400)
          .json({ message: "Erro ao criar medicamento", sucess: false });
      }
      return res
        .status(201)
        .json({ message: "Medicamento criado", sucess: true });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro no servidor", detalhe: error.message });
    }
  };

  listarMedicamento = async (res) => {
    try {
      const medicamentos = await prisma.medicamentos.findMany();
      if (!medicamentos) {
        return res
          .status(400)
          .json({ message: "Erro ao listar medicamento", sucess: false });
      }
      return res.status(201).json({ medicamentos });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro no servidor", detalhe: error.message });
    }
  };

  deletarMedicamento = async (res, req) => {
    try {
      const medicamento = await prisma.medicamentos.findUnique({
        where: { id: req.body.id },
      });
      if (!medicamento) {
        return res
          .status(400)
          .json({ message: "Erro ao buscar medicamento", sucess: false });
      }

      await prisma.medicamentos.delete({ where: { id: req.body.id } });
      return res.status(201).json({
        message: "Medicamento deletado",
        sucess: false,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro no servidor", detalhe: error.message });
    }
  };

  async atualizarMedicamento(req, res) {
    try {
      if (!req.body.id) {
        return res
          .status(400)
          .json({ message: "Erro ao buscar medicamento", sucess: false });
      }

      const medicamento = await prisma.medicamentos.findUnique({
        where: { id: req.body.id },
      });

      if (!medicamento) {
        return res
          .status(404)
          .json({ message: "Medicamento não encontrado", sucess: false });
      }

      await prisma.medicamentos.update({
        where: { id: req.body.id },
        data: {
          descricao: req.body.descricao,
          dosagem: req.body.dosagem,
          frequencia: req.body.frequencia,
          nome: req.body.nome,
        },
      });

      return res.status(200).json({
        sucess: true,
        message: "Medicamento atualizado",
        medicamento: medicamento,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro no servidor", detalhe: error.message });
    }
  }
}

export default MedicamentosModel;
