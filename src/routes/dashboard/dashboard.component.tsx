import { useContext, useEffect, useState } from "react";
import { menuItemType } from "../../types/menuItemType";
import { MenuContext } from "../../contexts/menu.context";

import DashboardPage from "../../pages/dashboard-page/dashboard.page";
import AllHabitsPage from "../../pages/all-habits/all-habits.page";
import BuddyPage from "../../pages/buddy/buddy.page";
import TrendsPage from "../../pages/trends/trends.page";
import ChatPage from "../../pages/chat/chat.page";

const Dashboard = () => {
  const { menuItems } = useContext(MenuContext);
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
    <div className="flex">
      {selectComponent}
    </div>
  );
};

export default Dashboard;
