const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const todosRoutes = require("./routes/todos.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors());

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", process.env.ORIGIN_URL);
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Cookie");
//     res.header("Access-Control-Allow-Credentials", "true");

//     if (req.method === "OPTIONS") {
//         return res.sendStatus(200);
//     }
//     next();
// });

app.use(express.json());
app.use(cookieParser());
app.use(todosRoutes);
app.use(userRoutes);

app.listen(process.env.PORT || 3232);