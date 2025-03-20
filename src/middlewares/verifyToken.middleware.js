import jwt from "jsonwebtoken";
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ mensagem: "Token é obrigatório" });
    }

    jwt.verify(token, "CH4V3S3CR3T4", (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ auth: false, message: "Token expirado" });
        }
        return res.status(401).json({ auth: false, message: "Token inválido" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro no servidor", detalhe: error.mensagem });
  }
};
