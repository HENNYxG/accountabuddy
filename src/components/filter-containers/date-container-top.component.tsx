import ArrowLeftCircleOutline from "../../assets/icons/arrow-left-circle-outline-icon";
import ArrowRightCircleOutline from "../../assets/icons/arrow-right-circle-outline-icon";
import PlusRoundedIcon from "../../assets/icons/plus-rounded-icon";
import { UIContext } from "../../contexts/ui.context";
import { useContext } from "react";

// habitscontainertop
const DateContainerTop = () => {
  const { setHabitWindowOpen } = useContext(UIContext);
    return (
      <div className="p-3 flex justify-between items-center">
        {/* date and arrows*/}
        <div className="flex gap-4 items-center">
          <div className="flex align-text-bottom">
            <h2 className="font-semibold text-3xl">Sunday</h2>
            <span className="font-light text-[1.6rem] flex align-bottom items-center">
              , July 17 2024
            </span>
          </div>

          <div className="flex gap-1 ml-4">
            <div className="text-customRed cursor-pointer">
              <ArrowLeftCircleOutline
                color="#FF0000"
                width="25px"
                height="25px"
              />
            </div>

            <div className="text-customRed cursor-pointer">
              <ArrowRightCircleOutline
                color="#FF0000"
                width="25px"
                height="25px"
              />
            </div>
          </div>
        </div>
        {/* New Habit*/}
        <div className="flex gap-2">
          <button className="flex gap-2 items-center bg-customRed text-white p-3 rounded-md text-sm ">
            <PlusRoundedIcon color="#FFFFFF" width="20px" height="20px" />
            <span className="font-clash-medium">New Group</span>
                </button>
                
          <button className="flex gap-2 items-center bg-customRed text-white p-3 rounded-md text-sm "
          onClick={()=>{setHabitWindowOpen(true);}}>
            <PlusRoundedIcon color="#FFFFFF" width="20px" height="20px" />
            <span className="font-clash-medium">New Habit</span>
          </button>
        </div>
      </div>
    );
}
export default DateContainerTop;