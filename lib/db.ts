import { PrismaClient } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface Global {
      db: PrismaClient | undefined;
    }
  }
}

const db = new PrismaClient();

if (process.env.NODE_ENV === "development") global.db = db;

export default db;
