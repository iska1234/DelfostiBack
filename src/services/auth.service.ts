import bcrypt from "bcryptjs";
import { UserData } from "../models/users";
import { ApiError } from "../middlewares/error";
import { generateToken } from "../utils/token";
import { getUserIdByEmail, loginUser, registerUser } from "../data/auth.data";


export async function registerUserToken(
  name: string,
  email: string,
  password: string,
  age: number,
  role: string = "user"
): Promise<UserData> {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await registerUser(name, email, hashedPassword, age, role);

  return user;
}

export const loginUserToken = async (
  email: string,
  password: string
): Promise<{ id: number; token: string; role: string }> => {
  const userId = await getUserIdByEmail(email);
  if (!userId)
    throw new ApiError("Error en el login", 400, {
      email: "El usuario no existe",
    });

  const user = await loginUser(email, password);
  if (!user)
    throw new ApiError("Error en el login", 400, {
      password: "Contraseña incorrecta",
    });

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch)
    throw new ApiError("Error en el login", 400, {
      password: "Contraseña incorrecta",
    });

  const token = generateToken({ userId, role: user.role || "" });

  return { id: userId, token, role: user.role };
};
