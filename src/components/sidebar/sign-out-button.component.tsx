import { SignOutButton } from "@clerk/clerk-react";
import SignOutIconTwo from "../../assets/icons/signout-icon";

const iconSize = "80px";
const iconColor = "#000";

const LogOutButton = () => {
    return (
      <div className="flex gap-2 items-center px-3 py-4 mb-2 mt-28 cursor-pointer rounded-md hover:bg-gray-200 transition">
        <span className="h-8 w-8 flex items-center ml-1">
          <SignOutIconTwo
            width={iconSize}
            height={iconSize}
            color={iconColor}
          />
        </span>
        <div className="text-2xl font-medium pl-3 pb-1">
          <SignOutButton />
        </div>
      </div>
    );
}

export default LogOutButton;