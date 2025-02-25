export interface AppConfig {
  port: number;
  node_env: string;
  databaseUrl: string;
  jwtSecret: string;
}

export type ConfigKey = keyof AppConfig;
