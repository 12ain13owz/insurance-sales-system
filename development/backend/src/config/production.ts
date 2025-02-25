import { AppConfig } from "./type";

export const productionConfig: AppConfig = {
  port: Number(process.env.PORT),
  node_env: String(process.env.NODE_ENV),
  databaseUrl: String(process.env.DATABASE_URL),
  jwtSecret: String(process.env.JWT_SECRET),
};

export type ConfigKey = keyof AppConfig;
