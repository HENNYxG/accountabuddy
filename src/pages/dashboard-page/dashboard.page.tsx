import "./dashboard.styles.scss";
import React from "react";
import ArrowLeftCircleOutline from "../../assets/icons/arrow-left-circle-outline-icon";
import ArrowRightCircleOutline from "../../assets/icons/arrow-right-circle-outline-icon";

import HabitGroup from "../../components/habit-group/habit-group-container.component";
import DarkMode from "../../components/dark-mode-toggle.component";
import DateContainerTop from "../../components/filter-containers/date-container-top.component";
import AllHabitsRightSidebar from "../../components/right-sidebar/all-habits-right-sidebar.component";
const DashboardPage = () => {
  return (
    // <div className="w-full">
    //   {/* <h1 className="text-5xl font-extrabold pb-5">Dashboard </h1> */}

    <div className="w-full h-100vh flex mt-1">
      <div className=" w-[80%] ml-3  pr-5">
        <TopWelcomeBar />
        <div className="flex flex-col pt-5 gap-3 justify-between w-[100%]">
          <DateContainerTop />
          <HabitGroup />

          <HabitGroup />
          <HabitGroup />
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
export default DashboardPage;

const RightSideBar = () => {
  return (
    <div className="w-full h-full mt-2  rounded-xl">
      <div className="w-full bg-black "></div>
    </div>
  );
}


const TopWelcomeBar = () => {
  return (
    <div className=" bg-white p-5 rounded-md flex justify-between">
      <div className="flex flex-col relative">
        <h1 className="text-5xl font-extrabold">Dashboard </h1>

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
    }
