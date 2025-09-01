import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useSession } from "../contexts/session.context";


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
    const { user } = useSession();
    console.log(user)
    const hasUserBeenCreated = useRef(false);


  useEffect(() => {
      if (user && !hasUserBeenCreated.current) {
        console.log("use effect launch");
        const mappedUser: User = {
          id: user.id,
          email: (user.email as any) || "",
          name: (user.user_metadata as any)?.full_name || null,
          clerkId: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
          emailAddresses: [{ emailAddress: (user.email as any) || "" }],
          username: (user.user_metadata as any)?.user_name || "",
        };
        createNewUser(mappedUser);
        hasUserBeenCreated.current = true;
      }
  }, [user]);

  return <div>Loading...</div>;
};

export default NewUser;

