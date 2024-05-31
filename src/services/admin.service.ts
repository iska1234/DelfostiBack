import { obtenerUsuarios } from "../data/admin.data";
import { Users } from "../models/users";

export async function obtenerUsuariosService(): Promise<Users[]> {
  const users = await obtenerUsuarios();
  return users;
}
