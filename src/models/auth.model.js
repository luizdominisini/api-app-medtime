import jwt from "jsonwebtoken";
import prisma from "../config/database.js";

class AuthModel {
  cadastrarUsuario = async (usuario, res) => {
    try {
      usuario.dataNascimento = new Date(usuario.dataNascimento);
      const userExist = await prisma.user.findUnique({
        where: { email: usuario.email },
      });

      if (userExist) {
        return res
          .status(400)
          .json({ message: "Usuário já cadastrado", sucess: false });
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

  listarUsuario = async (res) => {
    try {
      const users = await prisma.user.findMany();

      if (!users) {
        return res
          .status(404)
          .json({ message: "Nenhum usuário encontrado", sucess: false });
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
        return res
          .status(404)
          .json({ message: "Usuário não encontrado", sucess: false });
      }

      if (dadosLogin.senha != user.senha) {
        return res
          .status(403)
          .json({ message: "Senha incorreta", sucess: false });
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
          expiresIn: 1000,
        }
      );

      if (!token) {
        return res
          .status(400)
          .json({ message: "Erro ao assinar token", sucess: false });
      }

      return res.status(200).json({ token: token, sucess: true });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro no servidor", detalhe: error.message });
    }
  };

  deletarUsuario = async (req, res) => {
    try {
      const { user_id } = req.body;
      const user = await prisma.user.findUnique({ where: { id: user_id } });

      if (!user) {
        return res
          .status(404)
          .json({ message: "usuário não encontrado", sucess: false });
      }

      await prisma.user.delete({ where: { id: user.id } });
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
