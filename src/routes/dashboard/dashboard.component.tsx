import { useContext, useEffect, useState } from "react";
import { menuItemType } from "../../types/menuItemType";
import { MenuContext } from "../../contexts/menu.context";

import DashboardPage from "../../pages/dashboard-page/dashboard.page";
import AllHabitsPage from "../../pages/all-habits/all-habits.page";
import BuddyPage from "../../pages/buddy/buddy.page";
import TrendsPage from "../../pages/trends/trends.page";
import ChatPage from "../../pages/chat/chat.page";
import DotPattern from "../../components/backgrounds/dot-pattern-bg.component";
import { darkModeColor, lightModeColor } from "../../utils/colors";


const Dashboard = () => {
  const { menuItems, darkMode } = useContext(MenuContext);
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
      selectComponent = <BuddyPage />;
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

      {/* <div className="z-10">
      <DotPattern />
      </div> */}
    </div>
  );
};

export default Dashboard;
