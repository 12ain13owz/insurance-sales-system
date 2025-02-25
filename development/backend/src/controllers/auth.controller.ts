import { NextFunction, Request, Response } from "express";
import { AuthType } from "src/schemas/auth.schema";
import * as authService from "../services/auth.service";

export const login = async (
  req: Request<{}, {}, AuthType["login"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);

    res.json({
      message: "Login successful",
      token: result.token,
      admin: {
        id: result.admin.id,
        email: result.admin.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
