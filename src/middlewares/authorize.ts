import { NextFunction, Request, Response } from "express";
import { ApiError } from "./error";
import { Users } from "../models/users";

export function authorize(...allowedRoles: Users["role"][]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const role = req.userRole;
    if (!role) {
      console.log("No se encontró el rol del usuario");
      return next(new ApiError("No autorizado", 401));
    }
    if (allowedRoles.includes(role as Users["role"])) {
      next();
    } else {
      console.log("Acceso denegado");
      next(new ApiError("Acceso denegado", 403));
    }
  };
}
