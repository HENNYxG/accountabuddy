
import { useContext } from "react";
import { MenuContext } from "../../contexts/menu.context";
import ArrowLeftCircleOutline from "../../assets/icons/arrow-left-circle-outline-icon";
import ArrowRightCircleOutline from "../../assets/icons/arrow-right-circle-outline-icon";
import { darkModeColor, lightModeColor } from "../../utils/colors";

import HabitGroup from "../../components/habit-group/habit-group-container.component";
import DarkMode from "../../components/dark-mode-toggle.component";
import DateContainerTop from "../../components/filter-containers/date-container-top.component";
import AllHabitsRightSidebar from "../../components/right-sidebar/all-habits-right-sidebar.component";

const AllHabitsPage = () => {

  
  return (
    // <div className="w-full">
    //   {/* <h1 className="text-5xl font-extrabold pb-5">Dashboard </h1> */}

    <div 
      className="max-xl:flex-col gap-4 w-full flex flex-row p-3 " >
      <div className="flex-grow">
        <TopWelcomeBar />
        <DateContainerTop />

        <div className="flex flex-col pt-2 gap-3 justify-between w-[100%] ">
          <HabitGroup />
          <HabitGroup />
          <HabitGroup />
        </div>

      </div>
      <AllHabitsRightSidebar />
    </div>
    // </div>
  );
};
export default AllHabitsPage;

const RightSideBar = () => {
  return (
    <div className="w-full h-full mt-2  rounded-xl">
      <div className="w-full bg-black "></div>
    </div>
  );
};

const TopWelcomeBar = () => {
      const { darkMode, darkModeColor, lightModeColor } =
        useContext(MenuContext);
  return (
    <div
      style={{
        color: darkMode ? darkModeColor.text : lightModeColor.text,
        backgroundColor: darkMode
          ? darkModeColor.background
          : lightModeColor.secondaryBackground,
      }}
      className=" bg-white p-5 rounded-md flex justify-between"
    >
      <div className="flex flex-col relative">
        <h1 className="text-5xl font-extrabold">All Habit </h1>

        <div className="flex gap-1 items-center pl-2">
          <div className="flex align-text-bottom">
            <h2 className="font-semibold text-xl">Sunday</h2>
            <span className="font-light text-l flex align-bottom items-center">
              , July 17 2024
            </span>
          </div>

          <div className="flex gap-1 ml-4">
            <div className="text-customRed cursor-pointer">
              <ArrowLeftCircleOutline
                color="#FF0000"
                width="20px"
                height="20px"
              />
            </div>

            <div className="text-customRed cursor-pointer">
              <ArrowRightCircleOutline
                color="#FF0000"
                width="20px"
                height="20px"
              />
            </div>
          </div>
        </div>
        {/* <span className="font-semibold text-[15px] text-gray-400 pl-1 -mb-2">
          Welcome back, <span className="font-medium text-gray-400">George</span>
        </span> */}
      </div>
      <div className="flex flex-col">
        {/* <span className="text-xl">
          <span className="font-bold">Where ever you go</span>
          <span className="font-light">, there you are</span>
        </span>
        <span className="font-light text-[12px] text-gray-400">
          Welcome back
        </span> */}
        <div className="w-[50%] flex flex-col gap-3 align-middle center justify-between">
          <div className="w-[50%] h-[50px]  flex">
            <DarkMode />
          </div>
        </div>
      </div>
    </div>
  );
};
