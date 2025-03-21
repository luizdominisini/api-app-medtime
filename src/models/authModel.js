import jwt from "jsonwebtoken";
import prisma from "../config/database.js";

class AuthModel {
  createUser = async (usuario, res) => {
    try {
      usuario.dataNascimento = new Date(usuario.dataNascimento);
      const userExist = await prisma.user.findUnique({
        where: { email: usuario.email },
      });
      if (userExist) {
        return res.status(400).json({ message: "Usuário já cadastrado" });
      }

      await prisma.user.create({ data: usuario });

      return res
        .status(201)
        .json({ message: "Usuário cadastrado com sucesso", sucesso: true });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro no servidor", detalhe: error.message });
    }
  };

  listUsers = async (res) => {
    try {
      const users = await prisma.user.findMany();
      if (!users) {
        return res.status(404).json({ message: "Nenhum usuário encontrado" });
      }
      return res.status(200).json({ users });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro no servidor", detalhe: error.message });
    }
  };

  login = async (dadosLogin, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email: dadosLogin.email },
      });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      if (dadosLogin.senha != user.senha) {
        return res.status(403).json({ message: "Senha incorreta" });
      }

      const token = jwt.sign(
        {
          id: user.id,
          nome: user.nome,
          email: user.email,
          dataNascimento: user.dataNascimento,
        },
        "CH4V3S3CR3T4",
        {
          expiresIn: 30,
        }
      );

      if (!token) {
        return res.status(400).json({ message: "Erro ao assinar token" });
      }

      return res.status(200).json({ token: token });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro no servidor", detalhe: error.message });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { user_id } = req.body;
      const user = await prisma.user.findUnique({ where: { id: user_id } });

      if (!user) {
        return res
          .status(404)
          .json({ message: "usuário não encontrado", sucess: false });
      }

      const deletedUser = await prisma.user.delete({ where: { id: user.id } });
      return res
        .status(200)
        .json({ message: "Usuário deletado com sucesso", sucess: true });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro no servidor", detalhe: error.message });
    }
  };
}

export default AuthModel;
