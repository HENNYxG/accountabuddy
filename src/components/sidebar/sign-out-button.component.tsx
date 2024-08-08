import { SignOutButton } from "@clerk/clerk-react";
import SignOutIconTwo from "../../assets/icons/signout-icon";
import { useContext } from "react";
import { UIContext } from "../../contexts/ui.context";
import { useClerk } from "@clerk/clerk-react";

const iconSize = "80px";
const iconColor = "#000";

const LogOutButton = () => {
  const { expanded, darkMode } = useContext(UIContext);
  const {signOut} = useClerk();
    return (
      <div
        className={
          expanded
            ? "flex gap-2 items-center px-3 py-4 mb-2 mt-[2%] cursor-pointer rounded-md hover:bg-red-200 transition dark:hover:bg-red-600 "
            : "flex gap-2 items-center  pl-2 py-3 cursor-pointer rounded-md hover:bg-red-200 transition dark:hover:bg-red-600"
        }
        onClick={() => signOut({ redirectUrl: "/" })}
      >
        <span className="h-8 w-8 flex items-center justify-center ml-1">
          <SignOutIconTwo
            width={iconSize}
            height={iconSize}
            color={darkMode ? "#ffffff" : "#000000"}
          />
        </span>
        <div className=" w-full h-full">
          <SignOutButton>
            <button>
              {expanded && (
                <span className="text-2xl font-medium pl-1 pb-1">Sign out</span>
              )}{" "}
            </button>
          </SignOutButton>
        </div>
      </div>
    );
}

export default LogOutButton;