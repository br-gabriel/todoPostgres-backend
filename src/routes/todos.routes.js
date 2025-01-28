const express = require("express");
const todosRoutes = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authorization = require("../middlewares/authorization");
const jwt = require("jsonwebtoken");
const setCorsHeaders = require("../middlewares/corsMiddleware");

todosRoutes.use(setCorsHeaders);

todosRoutes.post("/user/todos", authorization, async (req, res) => {
    const { name } = req.body;
    
    const token = req.cookies.access_token;
    const decodedToken = await jwt.decode(token);
    const userId = decodedToken.id;

    const todo = await prisma.todo.create({
        data: {
            name,
            userId,
        },
    });

    return res.status(201).json(todo);
});

todosRoutes.get("/user/todos", authorization, async (req, res) => {
    const token = req.cookies.access_token;
    const decodedToken = await jwt.decode(token);
    const userId = decodedToken.id;

    const allTodos = await prisma.todo.findMany({ where: { userId } });

    return res.status(200).json(allTodos);
});

todosRoutes.put("/user/todos", authorization, async (req, res) => {
    const { name, id, status } = req.body;
    
    if(!id) {
        return res.status(400).json({ error: "Id é obrigatório" });
    };

    const todoAlreadyExists = await prisma.todo.findUnique({
         where: {id}
    });

    if(!todoAlreadyExists) {
        return res.status(404).json({ error: "Essa tarefa não existe" });
    };

    const todo = await prisma.todo.update({
        where: {
            id,
        },
        data: {
            name,
            status,
        },
    });

    return res.status(200).json(todo);
});

todosRoutes.delete("/user/todos/:todoid", authorization, async (req, res) => {
    const { todoid } = req.params;
    const intID = parseInt(todoid);
    
    if(!intID) {
        return res.status(400).json({ error: "Id é obrigatório" });
    };

    const todoAlreadyExists = await prisma.todo.findUnique({
         where: { id: intID }, 
    });

    if(!todoAlreadyExists) {
        return res.status(404).json({ error: "Essa tarefa não existe" });
    };

    await prisma.todo.delete({ where: { id: intID } });

    return res.status(200).send();
})

module.exports = todosRoutes;