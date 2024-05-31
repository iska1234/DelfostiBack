import express from "express";
import { getAllUsersController } from "../controller/admin.controller";
import { authenticateHandler } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";

const adminRouter = express.Router();

adminRouter.get(
  "/users/all",
  authenticateHandler,
  authorize("admin"),
  getAllUsersController
);

export default adminRouter;
