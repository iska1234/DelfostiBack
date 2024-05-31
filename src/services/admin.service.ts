import { getAllUsers } from "../data/admin.data";
import { Users } from "../models/users";

export async function getAllUsersService(): Promise<Users[]> {
  const users = await getAllUsers();
  return users;
}
