import { Link, Outlet } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { ReactComponent as HomeIcon } from "../../assets/home-icon.svg";
import LogoAndName from "../logo-and-name/logo-and-name.component";

const Sidebar = () => {
  return (
    <div className="relative bg-customIvory flex flex-col h-full pt-5 border-r border-gray-300 p-10">
          <div className=" h-100p pb-[35%] -ml-5"> 
              <LogoAndName />
        </div>
          <div className=" flex flex-col gap-2 w-full">
        <Link
          className="flex items-center p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          to="/"
        >
          <span className="h-5 w-5 flex items-center">
            <HomeIcon />
          </span>
          <p className="text-lg font-bold pl-4">Home</p>
        </Link>
        <Link
          className="flex items-center p-3 bg-gray-200 rounded hover:bg-gray-300 transition"
          to="/dashboard"
        >
          <span className="h-5 w-5 flex items-center">
            {" "}
            <HomeIcon />
          </span>
          <p className="text-lg font-bold pl-4">Dashboard</p>
        </Link>

        <div className="absolute bottom-10 -ml-2 flex bg-customGreen pl-2 pr-2 pb-3 pt-3 rounded-xl items-center cursor-pointer">
          <span className="items-center">
            <UserButton />
          </span>
          <p className="pl-3 pr-3 text-lg text-nowrap font-bold">
            George Henin
          </p>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
