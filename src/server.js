const express = require("express");
const cookieParser = require("cookie-parser");
const todosRoutes = require("./routes/todos.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(todosRoutes);
app.use(userRoutes);

const PORT = process.env.PORT || 3232;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});