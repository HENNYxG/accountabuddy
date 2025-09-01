import { useContext, useEffect, useState } from "react";
import { menuItemType } from "../../types/menuItemType";
import { UIContext } from "../../contexts/ui.context";

import DashboardPage from "../../pages/dashboard-page/dashboard.page";
import AllHabitsPage from "../../pages/all-habits/all-habits.page";
import SocialPage from "../../pages/social/social.page";
import TrendsPage from "../../pages/trends/trends.page";
import ChatPage from "../../pages/chat/chat.page";
import DotPattern from "../../components/backgrounds/dot-pattern-bg.component";
import { darkModeColor, lightModeColor } from "../../utils/colors";


const Dashboard = () => {
  const { menuItems, darkMode } = useContext(UIContext);
  const [selectedMenu, setSelectedMenu] = useState<menuItemType | null>(null);
  let selectComponent = null;


  useEffect(() => {
    menuItems.map((singleItem) => {
      if (singleItem.isSelected) {
        setSelectedMenu(singleItem);
      }
    });
  }, [menuItems]);

  switch (selectedMenu?.name) {
    case "Dashboard":
      selectComponent = <DashboardPage />;
      break;
    case "All Habits":
      selectComponent = <AllHabitsPage />;
      break;
    case "Friends":
      selectComponent = <SocialPage />;
      break;
    case "Trends":
      selectComponent = <TrendsPage />;
      break;
    case "Chat":
      selectComponent = <ChatPage />;
      break;
    default:
      selectComponent = <DashboardPage />;
  }
  return (
    <div className="flex relative">
      {selectComponent}
    <BlackSoftLayer />
      {/* <div className="z-10">
      <DotPattern />
      </div> */}
    </div>
  );
};

export default Dashboard;

const BlackSoftLayer = () => {
  const { habitWindowOpen, expanded } = useContext(UIContext);
  
  return (
    <div
      className={`w-full h-full bg-black fixed top-0 left-0 opacity-20 z-50 ${
         habitWindowOpen ? "fixed" : "hidden"
      }`}
    ></div>
  );
}
