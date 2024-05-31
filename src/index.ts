import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import sessionHandler from "./middlewares/session";
import errorHandler from "./middlewares/error";
import authRouter from "./routers/auth.router";
import projectsRouter from "./routers/projects.router";
import adminRouter from "./routers/admin.router";
import taskRouter from "./routers/task.router";

const morgan = require("morgan");
const app = express();
const port = 5500;
configDotenv();

app.use(express.json());
app.use(cookieParser());
app.use(sessionHandler());
app.use(cors());
app.use(errorHandler);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use("/auth", authRouter);
app.use("/projects", projectsRouter);
app.use("/admin", adminRouter);
app.use("/tasks", taskRouter);
app.listen(port, () => console.log(`Escuchando al puerto ${port}`));

export default app;
