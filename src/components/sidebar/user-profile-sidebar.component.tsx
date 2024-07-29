import { UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import {useState} from "react";

const UserProfileSidebar = () => {
     const userButtonAppearance = {
       elements: {
         userButtonAvatarBox: "w-28 h-28",
         userButtonPopoverActionButton: "text-red-600",
       },
     };

  const { user } = useUser();
  
  const [showFullName, setShowFullName] = useState(true);
  const handleClick = () => { setShowFullName(!showFullName); };

    return (
      <div className="flex flex-col gap-3 items-center justify-center mt-6">
        <UserButton appearance={userButtonAppearance} />
        <div className="flex flex-col justify-center items-center">
          <div onClick={handleClick}>
            {showFullName ? (
              <span className="font-semibold text-2xl">{user?.fullName}</span>
            ) : (
              <span className="font-semibold text-2xl">{user?.username}</span>
            )}
          </div>

          <span className="text-gray-500 text-sm font-medium hover:underline pointer cursor-pointer hover:font-semibold transition-all ">
            View Profile{" "}
            <span className="h-full pl-[1px] font-bold text-[20px]">
              &#8599;
            </span>
          </span>
        </div>
      </div>
    );
};

export default UserProfileSidebar;