import { Request, Response, NextFunction } from "express";
import { ApiError } from "../middlewares/error";
import {
  addNewTaskService,
  getTaskByIdService,
  getTasksByProjectService,
  getTasksByUserService,
  updateCompletedTaskService,
  updateDeclinedTaskService,
  updateRevisionTaskService,
} from "../services/task.service";

export async function addNewTaskController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      projectid,
      taskname,
      taskdescription,
      startdate,
      enddate,
      responsible,
    } = req.body;
    console.log("Request body:", req.body);
    if (
      !projectid ||
      !taskname ||
      !taskdescription ||
      !startdate ||
      !enddate ||
      !responsible
    ) {
      throw new ApiError("Todos los campos son obligatorios", 400);
    }

    const nuevaTarea = await addNewTaskService(
      projectid,
      taskname,
      taskdescription,
      startdate,
      enddate,
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

export async function getTaskByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      throw new ApiError("El ID de la tarea es obligatorio", 400);
    }

    const tarea = await getTaskByIdService(Number(taskId));

    if (!tarea) {
      return res.status(404).json({
        success: false,
        message: "Tarea no encontrada",
      });
    }

    return res.status(200).json({
      success: true,
      data: tarea,
    });
  } catch (error) {
    console.error("Error al obtener la tarea:", error);
    return next(new ApiError("Error al obtener la tarea", 500));
  }
}

export async function updateRevisionTaskController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      throw new ApiError("El ID de la tarea es obligatorio", 400);
    }

    const tareaActualizada = await updateRevisionTaskService(Number(taskId));

    if (!tareaActualizada) {
      throw new ApiError(
        "No se encontró ninguna tarea con el ID proporcionado",
        404
      );
    }

    return res.status(200).json({
      success: true,
      message: "Avance y estado de la tarea actualizados exitosamente",
      data: tareaActualizada,
    });
  } catch (error) {
    console.error("Error al actualizar el avance y estado de la tarea:", error);
    return next(
      new ApiError("Error al actualizar el avance y estado de la tarea", 500)
    );
  }
}

export async function updateCompletedTaskController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      throw new ApiError("El ID de la tarea es obligatorio", 400);
    }

    const tareaActualizada = await updateCompletedTaskService(Number(taskId));

    if (!tareaActualizada) {
      throw new ApiError(
        "No se encontró ninguna tarea con el ID proporcionado",
        404
      );
    }

    return res.status(200).json({
      success: true,
      message: "Avance y estado de la tarea actualizados exitosamente",
      data: tareaActualizada,
    });
  } catch (error) {
    console.error("Error al actualizar el avance y estado de la tarea:", error);
    return next(
      new ApiError("Error al actualizar el avance y estado de la tarea", 500)
    );
  }
}

export async function updateDeclinedTaskController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      throw new ApiError("El ID de la tarea es obligatorio", 400);
    }

    const tareaActualizada = await updateDeclinedTaskService(Number(taskId));

    if (!tareaActualizada) {
      throw new ApiError(
        "No se encontró ninguna tarea con el ID proporcionado",
        404
      );
    }

    return res.status(200).json({
      success: true,
      message: "Avance y estado de la tarea actualizados exitosamente",
      data: tareaActualizada,
    });
  } catch (error) {
    console.error("Error al actualizar el avance y estado de la tarea:", error);
    return next(
      new ApiError("Error al actualizar el avance y estado de la tarea", 500)
    );
  }
}
