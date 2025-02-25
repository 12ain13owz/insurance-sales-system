import { PrismaClient } from "@prisma/client";
import { config } from "../config";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
const node_env = config.get("node_env");

if (node_env !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
