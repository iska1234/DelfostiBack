import { query } from "../db";
import { Users } from "../models/users";

export async function obtenerUsuarios(): Promise<Users[]> {
    const queryString = `
    SELECT u.id, u.email, u.projectId, u.role, p.name AS projectName, u.name, u.age
      FROM users AS u
      LEFT JOIN projects AS p ON u.projectId = p.id;
    `;
    const { rows } = await query(queryString);
    return Array.isArray(rows) ? rows : [];
  }
  