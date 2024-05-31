import { Request, Response, NextFunction } from "express";
import { ApiError } from "../middlewares/error";
import { obtenerUsuariosService } from "../services/admin.service";


export async function obtenerUsuariosController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const usuarios = await obtenerUsuariosService();

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
