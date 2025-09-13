import { useAuth } from "@clerk/clerk-react";

export const getUserByClerkID = async () => {
  const { userId } = await useAuth();
  
  // This function should be called from the server side
  // Prisma client cannot run in the browser
  console.warn('getUserByClerkID should be called from server-side code');
  
  return null;
};

// Note: This utility is for client-side use only
// For database operations, use API endpoints or server-side functions
