import { Request, Response, NextFunction } from "express";
import { ApiError } from "../middlewares/error";
import { getAllUsersService } from "../services/admin.service";

export async function getAllUsersController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const usuarios = await getAllUsersService();

    return res.status(200).json({
      success: true,
      data: usuarios,
    });
  } catch (error) {
    console.error("Error al obtener los usuarios con rol 'user':", error);
    return next(
      new ApiError("Error al obtener los usuarios con rol 'user'", 500)
    );
  }
}
