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
        return res.status(400).json({ mensagem: "Usuário já cadastrado" });
      }

      await prisma.user.create({ data: usuario });

      return res
        .status(201)
        .json({ mensagem: "Usuário cadastrado com sucesso", sucesso: true });
    } catch (error) {
      return res
        .status(500)
        .json({ mensagem: "Erro no servidor", detalhe: error.mensagem });
    }
  };

  listUsers = async (res) => {
    try {
      const users = await prisma.user.findMany();
      if (!users) {
        return res.status(404).json({ mensagem: "Nenhum usuário encontrado" });
      }
      return res.status(200).json({ users });
    } catch (error) {
      return res
        .status(500)
        .json({ mensagem: "Erro no servidor", detalhe: error.mensagem });
    }
  };

  login = async (dadosLogin, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email: dadosLogin.email },
      });

      if (!user) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      if (dadosLogin.senha != user.senha) {
        return res.status(403).json({ mensagem: "Senha incorreta" });
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
        return res.status(400).json({ mensagem: "Erro ao assinar token" });
      }

      return res.status(200).json({ token: token });
    } catch (error) {
      return res
        .status(500)
        .json({ mensagem: "Erro no servidor", detalhe: error.mensagem });
    }
  };
}

export default AuthModel;
