import express from "express";
import {
  assignUserToProjectController,
  getAllUsersController,
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


export default adminRouter;
