import AuthModel from "../models/authModel.js";

const authModel = new AuthModel();

class AuthControler {
  createUser = async (req, res) => {
    await authModel.createUser(req.body, res);
  };

  listUsers = async (req, res) => {
    await authModel.listUsers(res);
  };

  login = async (req, res) => {
    await authModel.login(req.body, res);
  };
}

export default AuthControler;
