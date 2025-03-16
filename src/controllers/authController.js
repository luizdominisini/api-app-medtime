import AuthModel from "../models/authModel.js";
import jwt from "jsonwebtoken";

const authModel = new AuthModel();

class AuthControler {
  createUser = async (req, res) => {
    try {
      const user = await authModel.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  };

  listUsers = async (req, res) => {
    try {
      const user = await authModel.listUsers();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar usuários" });
    }
  };

  login = async (req, res) => {
    try {
      const token = await authModel.login(req.body);
      res.status(201).json(token);
    } catch (error) {
      res.status(500).json({ error: "Erro ao logar no sistema" });
    }
  };

  verifyJwt = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ auth: false, message: "Rota não autorizada sem token" });

    jwt.verify(token, "CH4V3S3CR3T4", () => {
      const decoded = jwt.decode(token);
      req.user = decoded;
      next();
    });
  };
}

export default AuthControler;
