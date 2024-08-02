import HabitCard from "../../components/habit-card/habit-card.component";
import AllHabitsPageUI from "../all-habits/components/top-bar.component";
import React from "react";
import { SidebarTwo } from "../../components/sidebar/sidebar.component";

const DashboardPage = () => {
  return (
    <div className="w-full max-sm:h-svh flex flex-col">
      <SidebarTwo />
      <div className="">
        <h1 className="text-5xl font-bold pb-5">Dashboard</h1>
        <AllHabitsPageUI />
      </div>
      <div className="w-[80%] m-5 flex flex-row gap-2 bg-black">
        <HabitCard />
        <HabitCard />
      </div>
    </div>
  );
};
export default DashboardPage;
