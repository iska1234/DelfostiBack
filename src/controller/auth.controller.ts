import { NextFunction, Request, Response } from "express";
import { ApiError } from "../middlewares/error";
import { userSchema } from "../models/users";
import { loginUserToken, registerUserToken } from "../services/auth.service";
import z from "zod";
import { verifyEmail } from "../data/auth.data";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, age, role } = userSchema.parse(req.body);
    const existingUser = await verifyEmail(email);
    if (existingUser) {
      return res.status(400).json({
        ok: false,
        error: {
          message: "El correo electrónico ya está registrado",
        }
      });
    }
    const user = await registerUserToken(name, email, password, age || 0, role);

    return res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente",
      data: user,
    });
  } catch (error: any) {
    console.error("Error en el registro:", error);

    if (error.code === "23505" && error.constraint === "users_email_key") {
      return res.status(400).json({
        ok: false,
        error: {
          message: "El correo electrónico ya está registrado",
        }
      });
    } else if (error instanceof ApiError) {
      return res.status(error.status).json({
        ok: false,
        error: { message: error.message, details: error.details || {} }
      });
    } else if (error instanceof z.ZodError) {
      const details: Record<string, string> = {}

      error.errors.forEach(err => {
        switch (err.path[0]) {
          case 'name':
            details['name'] = "El campo 'name' es obligatorio";
            break;
          case 'email':
            details['email'] = "El formato del campo 'email' es inválido";
            break;
          case 'password':
            details['password'] = "La contraseña debe tener al menos 5 caracteres";
            break;
          case 'age':
            details['age'] = "El campo 'age' debe ser un número positivo";
            break;
          default:
            break;
        }
      });

      if (!('name' in req.body)) {
        details['name'] = "No se encontró el campo 'name' en la solicitud";
      }
      if (!('email' in req.body)) {
        details['email'] = "No se encontró el campo 'email' en la solicitud";
      }
      if (!('password' in req.body)) {
        details['password'] = "No se encontró el campo 'password' en la solicitud";
      }
      if (!('age' in req.body)) {
        details['age'] = "No se encontró el campo 'age' en la solicitud";
      }

      const errorMessage = "Error en el registro";

      return res.status(400).json({
        ok: false,
        error: {
          message: errorMessage,
          details: details
        }
      });
    } else {
      return next(new ApiError("Error interno del servidor", 500));
    }
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const { id, token } = await loginUserToken(email, password);

    req.session.userId = id;
    return res.json({
      success: true,
      message: "Inicio de sesión exitoso",
      data: { token },
    });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    if (error instanceof ApiError) {
      const errors = [];
      if (error.details) {
        for (const [key, value] of Object.entries(error.details)) {
          errors.push({ [key]: value });
        }
      }
      return res.status(error.status).json({
        ok: false,
        error: { message: error.message, details: errors }
      });
    } else {
      return next(new ApiError("Error interno del servidor", 500));
    }
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.clearCookie("connect.sid");
      res.json({ ok: true, message: "Logout exitoso" });
    }
  });
};