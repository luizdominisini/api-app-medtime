import UserModel from "../models/userModel.js";

const userModel = new UserModel();

class UserController {
  createUserController = async (req, res) => {
    try {
      const user = await userModel.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  };
}

export default UserController;
