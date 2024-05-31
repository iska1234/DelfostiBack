import { Request, Response, NextFunction } from "express";
import { ApiError } from "../middlewares/error";
import { addNewProjectService, getAllProjectsService, getProjectByIdService, getProjectsDateByIdService } from "../services/projects.service";


export async function addNewProjectController(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Recibiendo solicitud para crear un nuevo proyecto");
  
      const { name, description, startDate, endDate, responsible } = req.body;
      if (!name || !description || !startDate || !endDate || !responsible) {
        throw new ApiError("Todos los campos son obligatorios", 400);
      }
  
      await addNewProjectService(name, description, startDate, endDate, responsible);
      return res.status(201).json({
        success: true,
        message: "Proyecto creado exitosamente",
      });
    } catch (error) {
      console.error("Error al crear el proyecto:", error);
      return next(new ApiError("Error al crear el proyecto", 500));
    }
  }
  
  
  export async function getAllProjectsController(_req: Request, res: Response, next: NextFunction) {
    try {
      const proyectos = await getAllProjectsService();
      return res.status(200).json({
        success: true,
        data: proyectos,
      });
    } catch (error) {
      console.error("Error al obtener los proyectos:", error);
      return next(new ApiError("Error al obtener los proyectos", 500));
    }
  }
  
  export async function getProjectByIdController(req: Request, res: Response, next: NextFunction) {
    try {
      const proyectoId = parseInt(req.params['id']);
      const proyecto = await getProjectByIdService(proyectoId);
      if (!proyecto) {
        return next(new ApiError("Proyecto no encontrado", 404));
      }
      return res.status(200).json({
        success: true,
        data: proyecto,
      });
    } catch (error) {
      console.error("Error al obtener el proyecto por su ID:", error);
      return next(new ApiError("Error al obtener el proyecto por su ID", 500));
    }
  }
  
  
  export async function getProjectsDateByIdController(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const id = parseInt(req.params['id']);
      const fechas = await getProjectsDateByIdService(id);
      if (fechas) {
        res.status(200).json({ success: true, data: fechas });
      } else {
        next(new ApiError('No se encontró el proyecto con el ID proporcionado', 404));
      }
    } catch (error) {
      console.error('Error al obtener las fechas del proyecto:', error);
      next(new ApiError('Error al obtener las fechas del proyecto', 500));
    }
  }
  