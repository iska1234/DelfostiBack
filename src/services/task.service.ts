import {
  addNewTask,
  getTasksByProject,
  getTasksByUser,
} from "../data/task.data";
import { Tarea } from "../models/tasks";
import { colors } from "../utils/paletteColors";

export async function addNewTaskService(
  projectId: number,
  taskName: string,
  taskDescription: string,
  startDate: string,
  endDate: string,
  responsible: number
): Promise<Tarea> {
  const color = colors[Math.floor(Math.random() * colors.length)];

  const nuevaTarea = await addNewTask(
    projectId,
    taskName,
    taskDescription,
    startDate,
    endDate,
    color,
    undefined,
    undefined,
    responsible
  );

  return nuevaTarea;
}

export async function getTasksByProjectService(
  projectId: number
): Promise<Tarea[]> {
  const tareas = await getTasksByProject(projectId);
  return tareas;
}

export async function getTasksByUserService(userId: number): Promise<Tarea[]> {
  const tareas = await getTasksByUser(userId);
  return tareas;
}
