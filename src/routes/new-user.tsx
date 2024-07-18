import React, { useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { user } from "@prisma/client";


type NewUser = {
  clerkId: string;
  emailAddresses: Array;
  email: string;
  name: string;
  username: string;
};

const createNewUser = async (user: user) => {
    try {
        const response = await axios.post("http://localhost:4000/newuser", {
          data: {
            clerkId: user.id as string,
            email: user.emailAddresses[0].emailAddress as string,
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



  useEffect(() => {
      if (user) {
        console.log("use effect launch")
        createNewUser(user);
    }
  }, [user]);

  return <div>Loading...</div>;
};

export default NewUser;
