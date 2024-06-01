import {
  addNewTask,
  getTaskById,
  getTasksByProject,
  getTasksByUser,
  updateCompletedTask,
  updateDeclinedTask,
  updateRevisionTask,
} from "../data/task.data";
import { Tarea } from "../models/tasks";

import { colors } from "../utils/paletteColors";

export async function addNewTaskService(
  projectid: number,
  taskname: string,
  taskdescription: string,
  startdate: string,
  enddate: string,
  responsible: number
): Promise<Tarea> {
  const color = colors[Math.floor(Math.random() * colors.length)];

  const nuevaTarea = await addNewTask(
    projectid,
    taskname,
    taskdescription,
    startdate,
    enddate,
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

export async function getTaskByIdService(taskId: number): Promise<Tarea | null> {
  const tarea = await getTaskById(taskId);
  return tarea;
}

export async function updateRevisionTaskService(taskId: number): Promise<Tarea | null> {
  return await updateRevisionTask(taskId);
}


export async function updateCompletedTaskService(taskId: number): Promise<Tarea | null> {
  return await updateCompletedTask(taskId);
}


export async function updateDeclinedTaskService(taskId: number): Promise<Tarea | null> {
  return await updateDeclinedTask(taskId);
}