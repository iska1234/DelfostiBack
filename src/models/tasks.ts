import { z } from "zod";

export const tareaSchema = z.object({
  taskId: z.number().int(),
  projectid: z.number().int().optional(),
  taskname: z.string().min(1),
  taskdescription: z.string().min(1),
  startdate: z.string(),
  enddate: z.string(),
  color: z.string().max(20),
  advance: z.number().int().optional(),
  state: z.string().min(1).optional(),
  responsible: z.number().int().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type TareaData = z.infer<typeof tareaSchema>;
export type Tarea = TareaData;
