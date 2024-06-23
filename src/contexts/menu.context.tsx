import React, { ReactNode, createContext, useState } from 'react';
import { Icon } from '@fortawesome/fontawesome-svg-core';
import { menuItemType } from '../types/menuItemType';
import { faChartSimple, faMessage, faRectangleList, faTableColumns, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import DashboardIcon from "../assets/icons/dashboard-icon";
import HabitsTabIcon from "../assets/icons/habits-tab-icon";
import BuddyIcon from '../assets/icons/buddy-icon';
import AnalysisIcon from '../assets/icons/analysis-icon';
import ChatIcon from '../assets/icons/chat-icon';
// Create a new context
export const MenuContext = createContext({
  menuItems: [],
  setMenuItems: () => {},
});

const iconSize = "80px";
const iconColor = "#000";

// Create a context provider component
export const MenuProvider = ({ children }: { children: ReactNode}) => {
    const [menuItems, setMenuItems] = useState<menuItemType[]>([
      {
        name: "Dashboard",
        isSelected: true,
        icon: (
          <DashboardIcon width={iconSize} height={iconSize} color={iconColor} />
        ),
      },
      {
        name: "All Habits",
        isSelected: false,
        icon: (
          <HabitsTabIcon width={iconSize} height={iconSize} color={iconColor} />
        ),
      },
      {
        name: "Friends",
        isSelected: false,
        icon: (
          <BuddyIcon width={iconSize} height={iconSize} color={iconColor} />
        ),
      },
      {
        name: "Trends",
        isSelected: false,
        icon: (
          <AnalysisIcon width={iconSize} height={iconSize} color={iconColor} />
        ),
      },
      {
        name: "Chat",
        isSelected: false,
        icon: <ChatIcon width={iconSize} height={iconSize} color={iconColor} />,
      },
    ]);
    
	const value = { menuItems, setMenuItems };
	
    return (<MenuContext.Provider value={value}> {children} </MenuContext.Provider>);
};
