import "./dashboard.styles.scss";
import HabitCard from "../../components/habit-card/habit-card.component";
import { useUser } from "@clerk/clerk-react";

const Dashboard = () => {
  const {user} = useUser();
  console.log(user)
  console.log("hello")
  return (
    <div className="w-100vw h-100vh ">
      <h1 className="text-4xl font-bold pb-5">Dashboard </h1>
      <div className="habits-dashboard-card">
        <HabitCard />
        <HabitCard />
      </div>
    </div>
  );
};

export default Dashboard;
