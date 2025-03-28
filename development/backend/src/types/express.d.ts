import { JwtPayload } from "jsonwebtoken";

interface AdminPayload {
  id: string;
  email: string;
}

declare module "express" {
  interface Request {
    admin?: AdminPayload;
  }
}
