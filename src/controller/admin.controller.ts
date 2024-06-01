import { Request, Response, NextFunction } from "express";
import { ApiError } from "../middlewares/error";
import { assignUserToProjectService, getAllUsersService, updateUserRoleService } from "../services/admin.service";

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

export async function updateUserRoleController(req: Request, res: Response, next: NextFunction) {
  const userId = parseInt(req.params['id']);

  try {
    const updatedUser = await updateUserRoleService(userId);

    if (!updatedUser) {
      return next(new ApiError("Usuario no encontrado", 404));
    }

    return res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error al actualizar el rol del usuario:", error);
    return next(new ApiError("Error al actualizar el rol del usuario", 500));
  }
}

export async function assignUserToProjectController(req: Request, res: Response, next: NextFunction) {
  const userId = parseInt(req.params['id']);
  const { projectId } = req.body;

  if (!projectId) {
    return next(new ApiError("El projectId es requerido", 400));
  }

  try {
    const updatedUser = await assignUserToProjectService(userId, projectId);

    if (!updatedUser) {
      return next(new ApiError("Usuario no encontrado", 404));
    }

    return res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error al asignar el proyecto al usuario:", error);
    return next(new ApiError("Error al asignar el proyecto al usuario", 500));
  }
}
