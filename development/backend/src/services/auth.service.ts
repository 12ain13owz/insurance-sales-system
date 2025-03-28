import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "../utils/errors";
import { config } from "../config";
import prisma from "../utils/prisma";

export const login = async (email: string, password: string) => {
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin)
    throw new AppError(`ไม่พบ E-mail: ${email}`, 404, "LOW", {
      functionName: "loginService",
    });

  const isComparePassword = await compare(password, admin.password);
  if (!isComparePassword)
    throw new AppError("Email หรือ Password ไม่ถูกต้อง", 401, "LOW", {
      functionName: "loginService",
    });

  const token = sign(
    { id: admin.id, email: admin.email },
    config.get("jwtSecret"),
    { expiresIn: "12h" }
  );

  return { admin, token };
};
