import { useState } from "react";
import BuddyIcon from "../../assets/icons/buddy-icon";
import EllipsisHorizontalOutline from "../../assets/icons/ellipsis-horizontal-outline";
import RunningIcon from "../../assets/icons/running-icon";
import HabitIcon from "./habit-icon.component";
import { PieChart, Pie, Cell } from "recharts";
import { customCharcoal } from "../../utils/colors";




const HabitCard = () => {
  // State to track hover status
  const [isHovered, setIsHovered] = useState(false);

  // Event handlers to update the hover state
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="grid grid-rows-[1fr_2fr_3fr] w-[150px] h-[200px] items-center bg-[#e0dad1] rounded-3xl flex-col align-middle justify-center p-[20px] relative">
      <div className="row-span-1 flex justify-between items-center align-middle  ">
        <div className="absolute left-3 top-3 rounded-full -m-1 p-1 hover:bg-black/10 ">
          <BuddyIcon color={customCharcoal} width="20px" height="20px" />
        </div>

        <div
          className="absolute -top-[0.3rem] left-1/2 transform -translate-x-1/2 opacity-30 hover:cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <EllipsisHorizontalOutline
            color="#212121"
            width="30px"
            height="30px"
            type={isHovered ? "full" : ""}
          />
        </div>

        <div className="absolute right-3 top-3 text-customCharcoal font-medium text-sm pointer-events-none">
          4 <span className="fire-icon">🔥</span>
        </div>
      </div>

      <div className="row-span-2 relative w-[120px] h-[120px] my-[10px] items-center">
        <div className="relative w-[120px] h-[120px]">
          <CircularProgressBar progress={40} />
          {/* <svg width="150" height="150" className="absolute top-0 left-0">
            <circle
              cy="60"
              cx="60"
              r="55"
              strokeDasharray="0"
              stroke-dashoffset="0"
              className="fill-transparent stroke-white stroke-[10px]"
            ></circle>
            <circle
              cx="60"
              cy="60"
              r="55"
              strokeDasharray="0"
              stroke-dashoffset="0"
              id="progress"
              className="fill-transparent stroke-white stroke-[10px]"
            ></circle>
          </svg> */}
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <HabitIcon />
          </div>
        </div>
      </div>

      <div className="row-span-3 text-center text-customCharcoal font-medium">
        Habit Name
      </div>
    </div>
  );
};

export default HabitCard;


interface CircularProgressBarProps {
  progress: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  progress,
}) => {
  const data = [
    { name: "Completed", value: progress },
    { name: "Remaining", value: 100 - progress },
  ];

  const COLORS = ["#f46c2d", "#edf2f4"];

  return (
    <PieChart
      width={120}
      height={120}
      //className="bg-red-300 "
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    >
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        startAngle={90}
        endAngle={-270}
        innerRadius={50}
        outerRadius={60}
        paddingAngle={0}
        fill="#8884d8"
        stroke="none"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};