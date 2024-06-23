import "./dashboard.styles.scss";
import React from "react";
import HabitCard from "../../components/habit-card/habit-card.component";

const DashboardPage = () => {
  return (
    <div>
      <div className="w-100vw h-100vh ">
        <h1 className="text-5xl font-extrabold pb-5">Dashboard </h1>
        <div className="habits-dashboard-card">
          <HabitCard />
          <HabitCard />
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
