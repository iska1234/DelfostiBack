import { z } from "zod";

export const projectSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1),
  description: z.string().min(1),
  startDate: z.string(),
  endDate: z.string(),
  state: z.string().min(1),
  responsible: z.number().int(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});
export const fechasProyectoSchema = z.object({
  fechainicio: z.string(),
  fechafin: z.string(),
});

export type ProjectData = z.infer<typeof projectSchema>;
export type Projects = ProjectData;
export type FechasProyectoData = z.infer<typeof fechasProyectoSchema>;