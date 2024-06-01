import { assignUserToProject, getAllUsers, getUserProjectId, updateUserRole } from "../data/admin.data";
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

export async function getUserProjectIdService(userId: number): Promise<number | null> {
  try {
    const projectId = await getUserProjectId(userId);
    return projectId;
  } catch (error) {
    console.error("Error while fetching user's projectId:", error);
    throw new Error("Internal server error");
  }
}