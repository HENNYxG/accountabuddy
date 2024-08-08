import HabitCard from "../habit-card/habit-card.component";
import BuddyIcon from "../../assets/icons/buddy-icon";
import GridPattern from "../backgrounds/grid-pattern-bg.component"; 
import DotPattern from "../backgrounds/dot-pattern-bg.component";
import { cn } from "../../utils/utils";

const HabitGroup = () => {

    return (
      <div>
        <div className="bg-white/40 shadow-md ring-1 backdrop-blur-sm ring-black/5 p-3 rounded-2xl w-full flex flex-col relative dark:bg-[#1a1a21]/80">
          {/* <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            className={cn(
              "opacity-25 [mask-image:linear-gradient(to_bottom_right,transparent,white,white,transparent)] "
            )}
          /> */}
          {/* <GridPattern
            width={30}
            height={30}
            x={-1}
            y={-1}
            strokeDasharray={"4 2"}
          /> */}
          <div className="w-full flex flex-row align-middle self-center">
            <h2 className=" text-2xl font-extrabold pb-1">
              Shared Habit Group 1
            </h2>
            <div className="pl-2">
              <BuddyIcon color="#000000" width="25px" height="30px" />
            </div>
          </div>

          <div className="flex flex-row flex-wrap gap-3 min-h-[200px]">
            <HabitCard />
            <HabitCard />
          </div>
        </div>
      </div>
    );
}
export default HabitGroup;



        {
          /* <HabitGroupHeader />
            <HabitGroupList /> */
        }
