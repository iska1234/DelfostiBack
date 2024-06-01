import express from "express";
import { authenticateHandler } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
import {
  addNewTaskController,
  getTaskByIdController,
  getTasksByProjectController,
  getTasksByUserController,
  updateCompletedTaskController,
  updateRevisionTaskController,
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

taskRouter.get(
  "/details/:taskId",
  authenticateHandler,
  authorize("admin", "user"),
  getTaskByIdController
);

taskRouter.patch(
  "/update/revision/:taskId",
  authenticateHandler,
  authorize("admin", "user"),
  updateRevisionTaskController
);

taskRouter.patch(
  "/update/completed/:taskId",
  authenticateHandler,
  authorize("admin"),
  updateCompletedTaskController
);

export default taskRouter;
