import { useAuth } from "@clerk/clerk-react";
import { prisma } from "./db";
import { user } from "@prisma/client";


    
export const getUserByClerkID = async () => {
  const { userId } = await useAuth();

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },
  });
  return user;
};
//include: can say include:this and it will bring it from the entry
//selects a specific thing.
//this is server side only bc the imports are Node Modules. Prisma only runs on server
