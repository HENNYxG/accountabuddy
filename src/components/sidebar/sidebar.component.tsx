import { Link, Outlet } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { ReactComponent as HomeIconn } from "../../assets/home-icon.svg";
import LogoAndName from "../logo-and-name/logo-and-name.component";
import SidebarButtons from "./sidebar-buttons.component";
import SidebarNav from "./sidebar-nav.component";
import SignOutButton from "./sign-out-button.component";
import LogOutButton from "./sign-out-button.component";
import DarkMode from "../dark-mode-toggle.component";



const Sidebar = () => {
  return (
    <div className="relative bg-customIvory flex flex-col h-full pt-5 border-r border-gray-300 p-10">
      <div className=" h-auto -ml-5">
        <LogoAndName />
      </div>
      <div className=" flex flex-col gap-2 w-full">
        <SidebarNav />
        <LogOutButton />

        <div className="absolute bottom-10 -ml-2 flex  pl-4 pr-2 pt-3 pb-2 rounded-xl items-center align-middle cursor-pointer bg-customGreen">
          <span className="items-center">
            <UserButton />
          </span>

          <p className="w-[180px] pl-4 pr-3 pb-1.5 text-rg text-lg align-middle text-nowrap font-bold">
            George Henin
          </p>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
