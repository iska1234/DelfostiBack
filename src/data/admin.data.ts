import { query } from "../db";
import { Users } from "../models/users";

export async function getAllUsers(): Promise<Users[]> {
  const queryString = `
    SELECT u.id, u.email, u.projectId, u.role, p.name AS projectName, u.name, u.age
    FROM users AS u
    LEFT JOIN projects AS p ON u.projectId = p.id
    WHERE u.role = 'user';
    `;
  const { rows } = await query(queryString);
  return Array.isArray(rows) ? rows : [];
}



export async function updateUserRole(userId: number): Promise<Users | null> {
  const role = "jefe_encargado";
  const queryString = `
      UPDATE users
      SET role = $1
      WHERE id = $2
      RETURNING *
    `;
  const values = [role, userId];
  const { rows } = await query(queryString, values);
  return rows.length > 0 ? rows[0] : null;
}

export async function assignUserToProject(userId: number, projectId: number): Promise<Users | null> {
  const queryString = `
    UPDATE users
    SET projectId = $1
    WHERE id = $2
    RETURNING *;
  `;
  const values = [projectId, userId];
  const { rows } = await query(queryString, values);
  return rows.length > 0 ? rows[0] : null;
}