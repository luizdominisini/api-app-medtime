import MedicamentosModel from "../models/medicamentosModel.js";

const medicamentosModel = new MedicamentosModel();

class MedicamentosController {
  createMedicamento(req, res) {
    return medicamentosModel.createMedicamento(req.body, res);
  }

  listMedicamento(req, res) {
    return medicamentosModel.listMedicamento(res);
  }

  deleteMedicamento(req, res) {
    return medicamentosModel.deleteMedicamento(res, req);
  }
}

export default MedicamentosController;
