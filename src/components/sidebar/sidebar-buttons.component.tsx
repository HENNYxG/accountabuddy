import { Link } from "react-router-dom";
import HomeIcon from "../../assets/icons/home-icon";
import AnalysisIcon from "../../assets/icons/analysis-icon";
import BuddyIcon from "../../assets/icons/buddy-icon";
import HabitsTabIcon from "../../assets/icons/habits-tab-icon";
import DashboardIcon from "../../assets/icons/dashboard-icon";
import ChatIcon from "../../assets/icons/chat-icon";

const iconSize = "80px";
const iconColor = "#000";

const SidebarButtons = () => {
    return (
      <div className=" flex flex-col gap-2 w-full">

        <SidebarButton
          icon={
            <HomeIcon width={iconSize} height={iconSize} color={iconColor} />
          }
          name="Home"
        />

        <SidebarButton
          icon={
            <DashboardIcon
              width={iconSize}
              height={iconSize}
              color={iconColor}
            />
          }
          name="Dashboard"
        />

        <SidebarButton
          icon={
            <HabitsTabIcon
              width={iconSize}
              height={iconSize}
              color={iconColor}
            />
          }
          name="All Habits"
        />

        <SidebarButton
          icon={
            <BuddyIcon width={iconSize} height={iconSize} color={iconColor} />
          }
          name="Friends"
        />

        <SidebarButton
          icon={
            <AnalysisIcon
              width={iconSize}
              height={iconSize}
              color={iconColor}
            />
          }
          name="Trends"
        />

        <SidebarButton
          icon={
            <ChatIcon width={iconSize} height={iconSize} color={iconColor} />
          }
          name="Chat"
        />
      </div>
    );
}



const SidebarButton = ({icon, name}: {icon: JSX.Element, name: string}) => {
    return (
      <Link
        className="flex items-center p-3  rounded hover:bg-gray-300 transition"
        to="/dashboard"
      >
        <span className="h-5 w-5 flex items-center">
          {icon}
        </span>
        <p className="text-lg font-bold pl-4">{name}</p>
      </Link>
    );
}

export default SidebarButtons;


