import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import mocksRouter from "./routes/mocks.router.js";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import config from "./config/config.js";

const app = express();
const PORT = process.env.PORT||8080;


const connection = mongoose.connect(config.mongo.URL);

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use("/api/mocks", mocksRouter);

app.listen(PORT,() => console.log(`Escuchando en el puerto ${PORT}`))



export default app;

