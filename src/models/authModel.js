import prisma from "../config/database.js";
import jwt from "jsonwebtoken";

class AuthModel {
  createUser = async (usuario) => {
    usuario.dataNascimento = new Date(usuario.dataNascimento);
    const user = await prisma.user.create({ data: usuario });
    return user;
  };

  listUsers = async () => {
    return prisma.user.findMany();
  };

  login = async (dadosLogin) => {
    const user = await prisma.user.findUnique({
      where: { email: dadosLogin.email },
    });

    if (!user) {
      throw new Error("Email não cadastrado");
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
        expiresIn: 300,
      }
    );

    if (!token) {
      throw new Error("Erro com o token");
    }

    return { auth: true, token: token };
  };
}

export default AuthModel;
