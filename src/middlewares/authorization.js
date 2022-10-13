const jwt = require("jsonwebtoken");

async function authorization(req, res, next) {
    const token = req.cookies.access_token;

    if(!token) {
        return res.status(404).json({ error: "Token não encontrado" });
    }

    try {
        const secret = process.env.SECRET;
        await jwt.verify(token, secret);
        return next();
    } catch {
        return res.status(403).json({ error: "Token inválido" });
    }    
}

module.exports = authorization;