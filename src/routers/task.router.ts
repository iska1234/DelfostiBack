import express from "express";
import { authenticateHandler } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
import {
  addNewTaskController,
  getTasksByProjectController,
  getTasksByUserController,
} from "../controller/tasks.controller";

const taskRouter = express.Router();

taskRouter.post(
  "/create",
  authenticateHandler,
  authorize("admin"),
  addNewTaskController
);

taskRouter.get(
  "/all-project/:projectId",
  authenticateHandler,
  authorize("admin"),
  getTasksByProjectController
);

taskRouter.get(
  "/all-user/:userId",
  authenticateHandler,
  authorize("admin", "user"),
  getTasksByUserController
);

export default taskRouter;
