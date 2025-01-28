const express = require("express");
const userRoutes = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const emailRegex = require("../utils/regex");
const setCorsHeaders = require("../middlewares/corsMiddleware");

userRoutes.use(setCorsHeaders);

userRoutes.post("/user/signup", async (req, res) => {
    const { email, emailConfirm, password, passwordConfirm } = req.body;

    const checkPasswordLength = password.length;

    if (!email | !emailConfirm | !password | !passwordConfirm) {
        return res.status(400).json({ error: "Preencha todos os campos" });
    } else if (email !== emailConfirm) {
        return res.status(422).json({ error: "Os emails não são iguais" });
    } else if (checkPasswordLength < 8) {
        return res.status(422).json({ error: "A senha deve conter 8 ou mais caracteres" });
    } else if (password !== passwordConfirm) {
        return res.status(422).json({ error: "As senhas não são iguais" });
    } else if (emailRegex.test(email) === false) {
        return res.status(422).json({ error: "Formato do email é inválido" })
    }

    const userExists = await prisma.user.findUnique({
        where: { email }
    });

    if (userExists) {
        return res.status(422).json({ error: "Email já está em uso" });
    };

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const user = await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword,
        },
    });

    return res.status(201).json(user);
});

userRoutes.post("/user/signin", async (req, res) => {
    const { email, password } = req.body;

    if(!email) {
        return res.status(400).json({ error: "Email é obrigatório" });
    } else if (!password) {
        return res.status(400).json({ error: "Senha é obrigatória" });
    };

    const userExists = await prisma.user.findUnique({
        where: { email }
    });

    if (!userExists) {
        return res.status(422).json({ error: "Email ou senha inválida" });
    };

    const checkPassword = await bcrypt.compare(password, userExists.password);

    if (!checkPassword) {
        return res.status(422).json({ error: "Email ou senha inválida" });
    };

    try {
        const secret = process.env.SECRET;
        const token = await jwt.sign(
            {
                id: userExists.id,
            },
            secret,
            {expiresIn: '7d'}
        );

        return res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({ message: "Autenticação realizada com sucesso" });
        
    } catch {
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
});

userRoutes.get("/user/signout", async (req, res) => {
    return res.clearCookie('access_token').status(200).json({ message: "logout" });
});

module.exports = userRoutes;