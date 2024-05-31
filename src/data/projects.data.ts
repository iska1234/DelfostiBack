import { query } from "../db/index";
import { FechasProyectoData, Projects } from "../models/projects";

export async function addNewProject(
  name: string,
  description: string,
  startDate: string,
  endDate: string,
  responsible: number,
  state: string = "En Proceso"
): Promise<Projects> {
  const queryString = `
      INSERT INTO projects (name, description, startDate, endDate, responsible, state)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
  const { rows } = await query(queryString, [
    name,
    description,
    startDate,
    endDate,
    responsible,
    state,
  ]);

  return rows[0] as Projects;
}

export async function getAllProjects(): Promise<Projects[]> {
  const queryString = `
  SELECT p.*, u.name AS user_name
  FROM projects AS p
  INNER JOIN users AS u ON p.responsible = u.id;
    `;
  const { rows } = await query(queryString);
  return rows as Projects[];
}

export async function getProjectById(id: number): Promise<Projects | null> {
  const queryString = `
      SELECT * FROM projects WHERE id = $1;
    `;
  const { rows } = await query(queryString, [id]);
  if (rows.length === 0) {
    return null;
  }
  return rows[0] as Projects;
}

export async function getProjectsDateById(
  id: number
): Promise<FechasProyectoData | null> {
  const queryString = `
      SELECT fechaInicio, fechaFin FROM proyectos WHERE id = $1;
    `;
  const { rows } = await query(queryString, [id]);

  if (rows.length === 0) {
    console.log(
      "No se encontraron fechas para el proyecto con el ID proporcionado."
    );
    return null;
  }

  return rows[0] as FechasProyectoData;
}
