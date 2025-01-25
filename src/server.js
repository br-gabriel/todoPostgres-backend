const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const todosRoutes = require("./routes/todos.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

console.log("Allowed origin:", process.env.URL);

app.use(cors({
    origin: process.env.URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    credentials: true,
    optionsSuccessStatus: 200,
}));

app.use(express.json());
app.use(cookieParser());
app.use(todosRoutes);
app.use(userRoutes);

const PORT = process.env.PORT || 3232;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});