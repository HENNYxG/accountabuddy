import { PieChart, Pie, Cell } from "recharts";
import { defaultColor } from "../../utils/colors";
import { UIContext } from "../../contexts/ui.context";
import { useContext } from "react";

const DayProgressCard = () => {
      const { darkMode, darkModeColor, lightModeColor } =
        useContext(UIContext);
  
    const statisticsInfo = [
      { id: 1, num: 7, subTitle: "Best streaks" },
      { id: 2, num: 10, subTitle: "Perfect days" },
    ];
    return (
      <div
        style={{
          backgroundColor: darkMode
            ? darkModeColor.secondaryBackground
            : lightModeColor.secondaryBackground,
        }}
        className="flex flex-col gap-6 justify-center items-center bg-slate-50 rounded-xl p-5 pt-7"
      >
        <span className="font-bold text-xl cursor-pointer hover:text-customRed">
          Statistics
        </span>
        {/* the circular progress bar */}
        <div className="relative p-3">
          <CircularProgressBar progress={80} />
          <div className="flex flex-col justify-center items-center absolute top-[54%] left-1/2 transform -translate-x-1/2 -translate-y-3/4">
            <span className="font-bold text-xl text-customRed">80%</span>
            <span className="font-normal text-[12px] dark:text-slate-50">{`Today's Progress`}</span>
          </div>
        </div>
        {/* best streaks and perfect days */}
        <div className="my-4 flex justify-center gap-6 flex-wrap items-center w-full">
          {statisticsInfo.map((singleItem, singleItemIndex) => (
            <div className="flex items-center gap-3" key={singleItemIndex}>
              <div className="w-2 h-2 bg-customRed rounded-full"></div>
              <div className="text-[12px]">
                <span className="flex flex-col font-bold">
                  {singleItem.num}
                </span>
                <span className="text-gray-500 dark:text-slate-50">
                  {singleItem.subTitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default DayProgressCard;

interface CircularProgressBarProps {
    progress: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ progress }) => {
    const data = [
        { name: "Completed", value: progress },
        { name: "Remaining", value: 100 - progress },
    ];

    const COLORS = [defaultColor.default, "#edf2f4"];

    return (
      <PieChart
        width={200}
        height={170}
        //className="bg-red-300 "
        margin={{ top: 0, right: 3, bottom: 0, left: 0 }}
      >
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          startAngle={90}
          endAngle={-270}
          innerRadius={66}
          outerRadius={80}
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