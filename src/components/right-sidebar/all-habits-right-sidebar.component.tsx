import UserProfileSidebar from "../sidebar/user-profile-sidebar.component";
import DayProgressCard from "../data-cards/day-progress-card.component";
import CalendarMUI from "../data-cards/calendar-visual-progress.component";
import { UIContext } from "../../contexts/ui.context";
import { useContext } from "react";

const AllHabitsRightSidebar = () => {
    const { darkMode, darkModeColor, lightModeColor } = useContext(UIContext);
    return (
      <div
        style={{
          color: darkMode ? darkModeColor.text : lightModeColor.text,
        //   backgroundColor: darkMode
        //     ? darkModeColor.background
        //     : lightModeColor.secondaryBackground,
        }}
        className="max-xl:flex- max-xl:justify-around h-full flex flex-col items-center-center rounded-xl p-4 bg-white/30 dark:bg-opacity-60 backdrop-blur-sm shadow-sm "
      >
        <DayProgressCard />
        <CalendarMUI />
      </div>
    );
}

export default AllHabitsRightSidebar;