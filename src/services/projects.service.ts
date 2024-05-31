import {
  addNewProject,
  getAllProjects,
  getProjectById,
  getProjectsDateById,
} from "../data/projects.data";
import { Projects } from "../models/projects";
import { getMonthAndYear } from "../utils/getMonthYear";

export async function addNewProjectService(
  name: string,
  description: string,
  startDate: string,
  endDate: string,
  responsible: number
): Promise<Projects> {
  const project = await addNewProject(
    name,
    description,
    startDate,
    endDate,
    responsible
  );
  return project;
}

export async function getAllProjectsService(): Promise<Projects[]> {
  return await getAllProjects();
}

export async function getProjectByIdService(
  id: number
): Promise<Projects | null> {
  return await getProjectById(id);
}

export async function getProjectsDateByIdService(
  id: number
): Promise<{ mesInicio: number; mesFin: number; año: number } | null> {
  const fechas = await getProjectsDateById(id);

  if (fechas) {
    const { fechainicio, fechafin } = fechas;

    const [mesInicio, añoInicio] = getMonthAndYear(fechainicio);
    const [mesFin, _añoFin] = getMonthAndYear(fechafin);

    return { mesInicio, mesFin, año: añoInicio };
  } else {
    console.log(
      "No se encontraron fechas para el proyecto con el ID proporcionado."
    );
    return null;
  }
}
