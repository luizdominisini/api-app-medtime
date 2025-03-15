import prisma from "../config/database.js";

class UserModel {
  createUser = async (usuario) => {
    usuario.dataNascimento = new Date(usuario.dataNascimento);
    const user = await prisma.user.create({ data: usuario });
    return user;
  };
}

export default UserModel;
