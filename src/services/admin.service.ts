import { assignUserToProject, getAllUsers, updateUserRole } from "../data/admin.data";
import { Users } from "../models/users";

export async function getAllUsersService(): Promise<Users[]> {
  const users = await getAllUsers();
  return users;
}

export async function updateUserRoleService(userId: number): Promise<Users | null> {
  const updatedUser = await updateUserRole(userId);
  return updatedUser;
}


export async function assignUserToProjectService(userId: number, projectId: number): Promise<Users | null> {
  const updatedUser = await assignUserToProject(userId, projectId);
  return updatedUser;
}