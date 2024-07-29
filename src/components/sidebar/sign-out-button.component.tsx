import { SignOutButton } from "@clerk/clerk-react";
import SignOutIconTwo from "../../assets/icons/signout-icon";
import { useContext } from "react";
import { MenuContext } from "../../contexts/menu.context";
import { useClerk } from "@clerk/clerk-react";

const iconSize = "80px";
const iconColor = "#000";

const LogOutButton = () => {
  const { expanded } = useContext(MenuContext);
  const {signOut} = useClerk();
    return (
      <div
        className={
          expanded
            ? "flex gap-2 items-center px-3 py-4 mb-2 mt-[2%] cursor-pointer rounded-md hover:bg-red-200 transition"
            : "flex gap-2 items-center  pl-2 py-3 cursor-pointer rounded-md hover:bg-red-200 transition"
        }
        onClick={() => signOut({ redirectUrl: "/" })}
      >
        <span className="h-8 w-8 flex items-center justify-center ml-1">
          <SignOutIconTwo
            width={iconSize}
            height={iconSize}
            color={iconColor}
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