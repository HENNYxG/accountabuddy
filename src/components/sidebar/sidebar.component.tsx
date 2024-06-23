import { Link, Outlet } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { ReactComponent as HomeIconn } from "../../assets/home-icon.svg";
import LogoAndName from "../logo-and-name/logo-and-name.component";
import SidebarButtons from "./sidebar-buttons.component";
import SidebarNav from "./sidebar-nav.component";
import SignOutButton from "./sign-out-button.component";
import LogOutButton from "./sign-out-button.component";




const Sidebar = () => {
  return (
    <div className="relative bg-customIvory flex flex-col h-full pt-5 border-r border-gray-300 p-10">
      <div className=" h-100p pb-[15%] -ml-5">
        <LogoAndName />
      </div>
      <div className=" flex flex-col gap-2 w-full">
              <SidebarNav />
              <LogOutButton />
        <div className="absolute bottom-10 -ml-2 flex bg-customGreen pl-2 pr-2 pb-3 pt-3 rounded-xl items-center cursor-pointer">
          <span className="items-center">
            <UserButton />
          </span>

          <p className="pl-3 pr-3 text-rg text-nowrap font-bold">
            George Henin
          </p>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
