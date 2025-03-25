import AuthModel from "../models/auth.model.js";

const authModel = new AuthModel();

class AuthControler {
  cadastrarUsuario = async (req, res) => {
    return authModel.cadastrarUsuario(req.body, res);
  };

  listarUsuario = async (req, res) => {
    return authModel.listarUsuario(res);
  };

  login = async (req, res) => {
    return authModel.login(req.body, res);
  };

  deletarUsuario = async (req, res) => {
    return authModel.deletarUsuario(req, res);
  };
}

export default AuthControler;
