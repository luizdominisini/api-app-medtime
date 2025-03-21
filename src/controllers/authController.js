import AuthModel from "../models/authModel.js";

const authModel = new AuthModel();

class AuthControler {
  createUser = async (req, res) => {
    return authModel.createUser(req.body, res);
  };

  listUsers = async (req, res) => {
    return authModel.listUsers(res);
  };

  login = async (req, res) => {
    return authModel.login(req.body, res);
  };

  deleteUser = async (req, res) => {
    return authModel.deleteUser(req, res);
  };
}

export default AuthControler;
