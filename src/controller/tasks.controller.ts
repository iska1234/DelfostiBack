import { Request, Response, NextFunction } from "express";
import { ApiError } from "../middlewares/error";
import {
  addNewTaskService,
  getTasksByProjectService,
  getTasksByUserService,
} from "../services/task.service";

export async function addNewTaskController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      projectId,
      taskName,
      taskDescription,
      startDate,
      endDate,
      responsible,
    } = req.body;

    if (
      !projectId ||
      !taskName ||
      !taskDescription ||
      !startDate ||
      !endDate ||
      !responsible
    ) {
      throw new ApiError("Todos los campos son obligatorios", 400);
    }

    const nuevaTarea = await addNewTaskService(
      projectId,
      taskName,
      taskDescription,
      startDate,
      endDate,
      responsible
    );

    return res.status(201).json({
      success: true,
      message: "Tarea creada exitosamente",
      data: nuevaTarea,
    });
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    return next(new ApiError("Error al crear la tarea", 500));
  }
}

export async function getTasksByProjectController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      throw new ApiError("El ID del proyecto es obligatorio", 400);
    }

    const tareas = await getTasksByProjectService(Number(projectId));

    return res.status(200).json({
      success: true,
      data: tareas,
    });
  } catch (error) {
    console.error("Error al obtener las tareas del proyecto:", error);
    return next(new ApiError("Error al obtener las tareas del proyecto", 500));
  }
}

export async function getTasksByUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.params;

    if (!userId) {
      throw new ApiError("El ID del usuario es obligatorio", 400);
    }

    const tareas = await getTasksByUserService(Number(userId));

    return res.status(200).json({
      success: true,
      data: tareas,
    });
  } catch (error) {
    console.error("Error al obtener las tareas del usuario:", error);
    return next(new ApiError("Error al obtener las tareas del usuario", 500));
  }
}
