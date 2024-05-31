import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "./error";
import "dotenv/config";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      userRole?: string;
    }
  }
}

const jwtSecret = process.env['JWT_SECRET'] || '';

export function authenticateHandler(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new ApiError("No se encontró token de autorización", 401));
  }

  try {
    const payload = jwt.verify(token, jwtSecret) as {
      userId: number;
      role: string;
      iat: number;
      exp: number;
    };

    req.userId = payload.userId;
    req.userRole = payload.role;
    next();
  } catch (error) {
    return next(new ApiError(`Error al verificar el token: ${error}`, 401));
  }
}
