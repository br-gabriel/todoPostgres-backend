const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const todosRoutes = require("./routes/todos.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(todosRoutes);
app.use(userRoutes);

app.listen(process.env.PORT || 3232);

app.use(cors({
    origin: process.env.ORIGIN_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    credentials: true
}));