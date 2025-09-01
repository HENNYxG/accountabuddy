import { UserButton } from "../../utils/clerk-shim";
import {useState} from "react";
import { useSession } from "../../contexts/session.context";

const UserProfileSidebar = () => {
     const userButtonAppearance = {
       elements: {
         userButtonAvatarBox: "w-28 h-28",
         userButtonPopoverActionButton: "text-red-600",
       },
     };

  const { user } = useSession();
  
  const [showFullName, setShowFullName] = useState(true);
  const handleClick = () => { setShowFullName(!showFullName); };

    return (
      <div className="flex flex-col gap-3 items-center justify-center mt-6">
        <UserButton appearance={userButtonAppearance} />
        <div className="flex flex-col justify-center items-center">
          <div onClick={handleClick}>
            {showFullName ? (
              <span className="font-semibold text-2xl">{(user as any)?.user_metadata?.full_name || user?.email}</span>
            ) : (
              <span className="font-semibold text-2xl">{(user as any)?.user_metadata?.user_name || user?.email}</span>
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