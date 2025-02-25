import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function createAdmin() {
  const adminEmail = "admin@mis.com";
  const adminPassword = "!Qwer1234";
  const hashedPassword = await hash(adminPassword, 10);

  await prisma.admin.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      name: "Admin MIS",
    },
  });

  console.log(`✅ Admin Created: ${adminEmail}`);
}

createAdmin()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
