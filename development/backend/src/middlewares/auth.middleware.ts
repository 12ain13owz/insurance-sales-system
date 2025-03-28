import { NextFunction, Request, Response } from "express";
import { config } from "../config";
import { AppError } from "src/utils/errors";
import { verify } from "jsonwebtoken";
import { AdminPayload } from "src/types/express";

export const verifyToken = async (
  req: Request<unknown>,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      throw new AppError("ไม่พบ Token กรุณาเข้าสู่ระบบใหม่", 403, "LOW", {
        functionName: "verifyToken",
      });

    const decoded = verify(token, config.get("jwtSecret")) as AdminPayload;
    if (!decoded)
      throw new AppError("Token หมดอายุ, กรุณาเข้าสู่ระบบใหม่", 401, "LOW", {
        functionName: "verifyToken",
      });

    req.admin = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
