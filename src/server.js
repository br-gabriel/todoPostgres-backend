const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const todosRoutes = require("./routes/todos.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors({
    origin: process.env.ORIGIN_URL || 'https://todo-postgres-frontend.vercel.app' || 'https://todo-postgres-frontend-git-master-brgabriels-projects.vercel.app/' || 'https://todo-postgres-frontend-atjk2xk99-brgabriels-projects.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(todosRoutes);
app.use(userRoutes);

app.listen(process.env.PORT || 3232);