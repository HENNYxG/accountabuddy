import { UserButton, useUser } from "@clerk/clerk-react";
import LogoAndName from "../logo-and-name/logo-and-name.component";
import SidebarNav from "./sidebar-nav.component";
import LogOutButton from "./sign-out-button.component";
import UserProfileSidebar from "./user-profile-sidebar.component";
import ChevronLeftIcon from "../../assets/icons/chevron-left-icon";
import ChevronRightIcon from "../../assets/icons/chevron-right-icon";
import TripleDotVertical from "../../assets/icons/triple-dot-vertical-icon";
import { useContext } from "react";
import { UIContext } from "../../contexts/ui.context";
import MobileDarkModeToggle from "../ui-elements/dark-mode-mobile.component";




const Sidebar = () => {
  return (
    <div className="relative bg-white flex flex-col h-full pt-5 border-r border-gray-300 p-10 justify-between">
      <div className="w-full flex justify-center ">
        <UserProfileSidebar />
      </div>

      <div className=" flex flex-col gap-2 w-full pt-10">
        <SidebarNav />
      </div>

      <div className=" flex flex-col gap-2 w-full pt-10">
        <LogOutButton />
      </div>

      <div className=" bottom-0 left-0 pt-3 w-full flex justify-center">
        <LogoAndName />
      </div>

      


      {/* <div className="absolute bottom-10 -ml-2 flex  pl-4 pr-2 pt-3 pb-2 rounded-xl items-center align-middle cursor-pointer bg-customGreen">
          <span className="items-center">
            <UserButton />
          </span>

          <p className="w-[180px] pl-4 pr-3 pb-1.5 text-rg text-lg align-middle text-nowrap font-semibold">
            George Henin
          </p>
          <div className="absolute left-0 bottom-1 w-full flex justify-center ">
            {/* <span className="text-gray-500 text-sm font-medium hover:underline pointer cursor-pointer hover:font-semibold transition-all ">
              View Profile{" "}
              <span className="h-full pl-[1px] font-bold text-[20px]">
                &#8599;
              </span>
            </span> 
          </div>
        </div> */}
      
      
    </div>
  );
};
export default Sidebar;





export const SidebarTwo = () => {
  const { user } = useUser();
  const { expanded, setExpanded, darkMode, darkModeColor, lightModeColor } =
    useContext(UIContext);

  
       const userButtonAppearance = {
        elements: {
            userButtonAvatarBox: "w-14 h-14",
            userButtonPopoverActionButton: "text-red-600",
        },
    };

  return (
    <aside
      className={` h-full overscroll-y-auto py-2 max-sm:absolute max-sm:z-10 transition ${
        expanded ? "" : "max-sm:hidden"
      }`}
    >
      <nav
        style={{
          color: darkMode ? darkModeColor.text : lightModeColor.text,
          backgroundColor: darkMode
            ? darkModeColor.background
            : lightModeColor.secondaryBackground,
        }}
        className="h-full relative flex flex-col  rounded-r-xl border-r shadow-md transition-all dark:border-gray-700 dark:border-opacity-70"
      >
        {/* Open & close Toggle */}
        <div
          className={`w-full flex px-3 pt-3  ${
            expanded ? "justify-end -mb-3" : "justify-center"
          }`}
        >
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex align-center z-50 justify-center  py-1.5 rounded-lg w-14 bg-gray-50 transition-all dark:bg-customGreen dark:hover:bg-[#efff62] hover:bg-gray-100"
          >
            {expanded ? (
              <ChevronLeftIcon color="#000" width="32px" height="32px" />
            ) : (
              <ChevronRightIcon color="#000" width="32px" height="32px" />
            )}
          </button>
        </div>

        {/* Logo and name */}
        {/* <div className=" px-4 pb-2 flex flex-col justify-between items-center">
          <div
            className={`overflow-hidden transition-all ${
              expanded ? "w-full absolute bottom-3 left-2" : " flex"
            }`}
          >
            <LogoAndName />
          </div>
        </div> */}

        {/* Top User Profile BAdge */}

        <div className="w-full -mt-5 flex justify-center  ">
          {expanded ? (
            <UserProfileSidebar />
          ) : (
            <div className="border-b flex p-3 pt-10 pb-5 dark:border-gray-700 dark:border-opacity-70 transition-all">
              <UserButton appearance={userButtonAppearance} />
              <div
                className={`flex justify-between items-center overflow-hidden transition-all ${
                  expanded ? "w-60 ml-3" : "w-0"
                }`}
              ></div>
            </div>
          )}
        </div>

        {/* Mobile Dark Mode*/}
        {expanded && (
          <div className="flex justify-center p-2">
            <MobileDarkModeToggle />
          </div>) }

        {/* Menu Items */}

        <ul className="flex-1 px-3.5 leading-4 pt-[10%] ">
          <SidebarNav />
        </ul>
        <div className=" pb-2 px-3.5 leading-4 pt-[10%] max-sm:pt-0 max-sm:-mt-3 ">
          <LogOutButton />
        </div>

        {/* bottom user profile */}
        <div
          className={`border-t dark:border-gray-700 dark:border-opacity-70 transition-all flex p-3 max-sm:hidden ${
            expanded ? "" : "justify-center"
          }`}
        >
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-12 h-12",
                userButtonPopoverActionButton: "text-red-600",
              },
            }}
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-60 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{user?.fullName}</h4>
              <span className="text-xs text-gray-600">
                {user?.emailAddresses[0].emailAddress}
              </span>
            </div>
            <div className="flex align-center justify-center p-1.5 rounded-full hover:bg-gray-100 transition-all hover:cursor-pointer">
              <TripleDotVertical color={darkMode ? "#fff" : "#000"} width="20px" height="20px" />
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

