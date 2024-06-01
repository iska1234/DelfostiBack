import { query } from "../db";
import { Tarea } from "../models/tasks";

export async function addNewTask(
  projectid: number,
  taskname: string,
  taskdescription: string,
  startdate: string,
  enddate: string,
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
    projectid,
    taskname,
    taskdescription,
    startdate,
    enddate,
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

export async function getTaskById(taskId: number): Promise<Tarea | null> {
  const queryString = `
    SELECT tasks.*, users.name AS responsible_name
    FROM tasks
    INNER JOIN users ON tasks.responsible = users.id
    WHERE tasks.taskid = $1
  `;
  const { rows } = await query(queryString, [taskId]);
  return rows.length ? rows[0] : null;
}

export async function updateRevisionTask(
  taskId: number
): Promise<Tarea | null> {
  const avance = 25;
  const estado = "Revisión";

  const queryString = `
  UPDATE tasks
  SET advance = $1, state = $2
    WHERE taskId = $3
    RETURNING *
  `;

  const { rows } = await query(queryString, [avance, estado, taskId]);

  if (rows.length === 0) {
    return null;
  }

  return rows[0] as Tarea;
}
export async function updateCompletedTask(
  taskId: number
): Promise<Tarea | null> {
  const avance = 100;
  const estado = "Completada";

  const queryString = `
    UPDATE tasks
    SET advance = $1, state = $2
    WHERE taskId = $3
    RETURNING *
  `;

  const { rows } = await query(queryString, [avance, estado, taskId]);

  if (rows.length === 0) {
    return null;
  }

  return rows[0] as Tarea;
}
