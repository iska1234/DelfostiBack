import { query } from "../db";
import { Tarea } from "../models/tasks";

export async function addNewTask(
  projectId: number,
  taskName: string,
  taskDescription: string,
  startDate: string,
  endDate: string,
  color: string,
  state: string = "Elaboración",
  advance: number = 1,
  responsible: number
): Promise<Tarea> {
  const queryString = `
    INSERT INTO tasks (projectId, taskName, taskDescription, startDate, endDate, color, advance, state, responsible)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
    `;
  const { rows } = await query(queryString, [
    projectId,
    taskName,
    taskDescription,
    startDate,
    endDate,
    color,
    advance,
    state,
    responsible,
  ]);

  return rows[0] as Tarea;
}

export async function getTasksByProject(projectId: number): Promise<Tarea[]> {
  const queryString = `
    SELECT * FROM tasks
    WHERE projectId = $1
  `;
  const { rows } = await query(queryString, [projectId]);
  return rows;
}

export async function getTasksByUser(userId: number): Promise<Tarea[]> {
  const queryString = `
    SELECT * FROM tasks
    WHERE responsible = $1
  `;
  const { rows } = await query(queryString, [userId]);
  return rows;
}
