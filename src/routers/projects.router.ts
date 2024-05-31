import express from "express";

import {
  addNewProjectController,
  getAllProjectsController,
  getProjectByIdController,
  getProjectsDateByIdController,
} from "../controller/projects.controller";
import { authorize } from "../middlewares/authorize";
import { authenticateHandler } from "../middlewares/authenticate";

const projectsRouter = express.Router();

projectsRouter.post(
  "/create",
  authenticateHandler,
  authorize("admin"),
  addNewProjectController
);

projectsRouter.get(
  "/all",
  authenticateHandler,
  authorize("admin"),
  getAllProjectsController
);

projectsRouter.get(
  "/details/:id",
  authenticateHandler,
  authorize("admin"),
  getProjectByIdController
);

projectsRouter.get(
  "/dates/:id",
  authenticateHandler,
  authorize("admin"),
  getProjectsDateByIdController
);

export default projectsRouter;
