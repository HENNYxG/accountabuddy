import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";


type User = {
  id: string;
  email: string;
  name: string | null;
  clerkId: string;
  createdAt: Date;
  updatedAt: Date;
  emailAddresses: Array<{ emailAddress: string }>;
  username: string; // Add the 'username' property
};

const createNewUser = async (user: User) => {
    try {
        const response = await axios.post("http://localhost:4000/newuser", {
          data: {
            clerkId: user.id,
            email: user.emailAddresses[0].emailAddress,
            name: user.username,
          },
        });
        console.log("Data sent to server:", response.data);
        window.location.href = "/dashboard";
    } catch (error) {
        console.error("Error sending data to server:", error);
    }
};




const NewUser = () => {
    const { user } = useUser();
    console.log(user)
    const hasUserBeenCreated = useRef(false);


  useEffect(() => {
      if (user && !hasUserBeenCreated.current) {
        console.log("use effect launch");
        const mappedUser: User = {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress || "",
          name: user.fullName,
          clerkId: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
          emailAddresses: user.emailAddresses.map((email) => ({
            emailAddress: email.emailAddress,
          })),
          username: user.username || "",
        };
        createNewUser(mappedUser);
        hasUserBeenCreated.current = true;
      }
  }, [user]);

  return <div>Loading...</div>;
};

export default NewUser;

