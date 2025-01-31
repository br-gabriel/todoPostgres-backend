const jwt = require("jsonwebtoken");

async function authorization(req, res, next) {
  try {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ 
            error: "Token não fornecido",
            message: "É necessário estar autenticado para acessar este recurso" 
        });
    }

    const secret = process.env.SECRET;

    const decodedToken = await jwt.verify(token, secret);
    req.user = decodedToken;

    return next();
  } catch {
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
