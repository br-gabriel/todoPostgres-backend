const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const todosRoutes = require("./routes/todos.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'https://todo-postgres-frontend.vercel.app');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie');
//     res.header('Access-Control-Allow-Credentials', true);
    
//     if (req.method === 'OPTIONS') {
//         return res.status(200).end();
//     }
    
//     next();
// });

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(todosRoutes);
app.use(userRoutes);

const PORT = process.env.PORT || 3232;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});