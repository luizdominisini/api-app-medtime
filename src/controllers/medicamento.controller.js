import MedicamentosModel from "../models/medicamento.model.js";

const medicamentosModel = new MedicamentosModel();

class MedicamentosController {
  cadastrarMedicamento(req, res) {
    return medicamentosModel.cadastrarMedicamento(req.body, res);
  }

  listarMedicamento(req, res) {
    return medicamentosModel.listarMedicamento(res);
  }

  deletarMedicamento(req, res) {
    return medicamentosModel.deletarMedicamento(res, req);
  }

  atualizarMedicamento(req, res) {
    return medicamentosModel.atualizarMedicamento(req, res);
  }
}

export default MedicamentosController;
