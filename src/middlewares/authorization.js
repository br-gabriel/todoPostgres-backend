const jwt = require("jsonwebtoken");

async function authorization(req, res, next) {
  try {
    const token = req.cookies.access_token;
    
    if (!token) {
      return res.status(401).json({ error: "Acesso negado: Token não fornecido" });
    }

    const verified = jwt.verify(token, process.env.SECRET);
    if (!verified) {
      return res.status(401).json({ error: "Acesso negado: Falha na validação do token" });
    }

    req.user = verified;
    next();
  } catch (error) {
    console.error("Erro de autorização:", error);

    if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ 
            error: "Token expirado",
            message: "Sua sessão expirou. Por favor, faça login novamente"
        });
    }
    
    if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ 
            error: "Token inválido",
            message: "Token de autenticação inválido"
        });
    }

    return res.status(500).json({ 
        error: "Erro interno",
        message: "Ocorreu um erro ao validar sua autenticação"
    });
  }
}

module.exports = authorization;
