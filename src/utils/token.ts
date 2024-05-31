import "dotenv/config";
import jwt from "jsonwebtoken";

export const generateToken = (user: { userId: number, role: string }) => {
  const jwtSecret =  process.env["JWT_SECRET"] || '';
  return jwt.sign({ userId:user.userId, role: user.role }, jwtSecret, {
    expiresIn: "1d",
  });
};
