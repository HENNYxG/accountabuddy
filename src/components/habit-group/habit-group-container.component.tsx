import HabitCard from "../habit-card/habit-card.component";
import BuddyIcon from "../../assets/icons/buddy-icon";
const HabitGroup = () => {

    return (
      <div>
        <div className="bg-[#c4c4c4] p-3 rounded-2xl w-full flex flex-col">
          <div className="w-full flex flex-row align-middle self-center">
            <h2 className=" text-2xl font-extrabold pb-1">
              Shared Habit Group 1
            </h2>
            <div className="pl-2">
              <BuddyIcon color="#000000" width="25px" height="30px" />
            </div>
          </div>

          <div className="flex flex-row gap-3 min-h-[200px]">
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
