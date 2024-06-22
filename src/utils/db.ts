import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

//checking to see if prisma is in the global space, if its not then make it and assign it to prisma.
//this is to limit the db connections so it doesnt crash after multiple simultaneous connections
