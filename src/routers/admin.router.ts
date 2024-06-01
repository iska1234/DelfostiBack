import express from "express";
import {
  assignUserToProjectController,
  getAllUsersController,
  getUserProjectIdController,
  updateUserRoleController,
} from "../controller/admin.controller";
import { authenticateHandler } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";

const adminRouter = express.Router();

adminRouter.get(
  "/users/all",
  authenticateHandler,
  authorize("admin"),
  getAllUsersController
);

adminRouter.patch(
  "/update/jefe/:id",
  authenticateHandler,
  authorize("admin"),
  updateUserRoleController
);

adminRouter.patch(
  "/asign-project/:id",
  authenticateHandler,
  authorize("admin"),
  assignUserToProjectController
);

adminRouter.get(
  "/users/projectId/:id",
  authenticateHandler,
  authorize("admin", "jefe_encargado"),
  getUserProjectIdController
);

export default adminRouter;
