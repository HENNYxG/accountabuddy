import HabitCard from "../../components/habit-card/habit-card.component";
import AllHabitsPageUI from "../all-habits/components/top-bar.component";
import React from "react";
import { SidebarTwo } from "../../components/sidebar/sidebar.component";
import HamburgerMenu from "../../components/ui-elements/hamburger-menu.component";

const DashboardPage = () => {
  return (
    <div className="w-full max-sm:h-svh flex flex-col">
      <div className="flex p-5 justify-between">
        <h1 className="text-5xl font-bold ">Dashboard</h1>
        <div className=" hidden max-sm:flex ">
        <HamburgerMenu />
        </div>
      </div>
      <div className="w-[80%] m-5 flex flex-row gap-2 ">
        <HabitCard />
        <HabitCard />
      </div>
    </div>
  );
};
export default DashboardPage;
