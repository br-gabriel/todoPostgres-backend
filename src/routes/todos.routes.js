const express = require("express");
const todosRoutes = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authorization = require("../middlewares/authorization");
const jwt = require("jsonwebtoken");

todosRoutes.post("/user/todos", authorization, async (req, res) => {
  try {
    const { name } = req.body;

    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    const decodedToken = await jwt.decode(token);
    if (!decodedToken) {
      return res.status(401).json({ error: "Token inválido" });
    }

    const userId = decodedToken.id;

    const todo = await prisma.todo.create({
      data: {
        name,
        userId,
      },
    });

    return res.status(201).json(todo);
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

todosRoutes.get("/user/todos", authorization, async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    const decodedToken = await jwt.decode(token);
    if (!decodedToken) {
      return res.status(401).json({ error: "Token inválido" });
    }

    const userId = decodedToken.id;
    const allTodos = await prisma.todo.findMany({ where: { userId } });

    return res.status(200).json(allTodos);
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

todosRoutes.put("/user/todos", authorization, async (req, res) => {
  try {
    const { id, name, status } = req.body;
    if (!id) {
      return res.status(400).json({ error: "Id é obrigatório" });
    }

    const todoAlreadyExists = await prisma.todo.findUnique({
      where: { id },
    });

    if (!todoAlreadyExists) {
      return res.status(404).json({ error: "Essa tarefa não existe" });
    }

    const todo = await prisma.todo.update({
      where: { id },
      data: { name, status },
    });

    return res.status(200).json(todo);
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

todosRoutes.delete("/user/todos/:todoid", authorization, async (req, res) => {
  try {
    const { todoid } = req.params;
    const intID = parseInt(todoid);

    if (!intID) {
      return res.status(400).json({ error: "Id é obrigatório" });
    }

    const todoAlreadyExists = await prisma.todo.findUnique({
      where: { id: intID },
    });

    if (!todoAlreadyExists) {
      return res.status(404).json({ error: "Essa tarefa não existe" });
    }

    await prisma.todo.delete({ where: { id: intID } });

    return res.status(200).send();
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

module.exports = todosRoutes;
