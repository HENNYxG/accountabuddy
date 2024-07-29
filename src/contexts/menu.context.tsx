import { ReactNode, createContext, useState, useEffect } from 'react';

import { menuItemType } from '../types/menuItemType';

import DashboardIcon from "../assets/icons/dashboard-icon";
import HabitsTabIcon from "../assets/icons/habits-tab-icon";
import BuddyIcon from '../assets/icons/buddy-icon';
import AnalysisIcon from '../assets/icons/analysis-icon';
import ChatIcon from '../assets/icons/chat-icon';

const expandedLogic = () => {
  if (window.innerWidth > 720) {
    return true;
  } else {
    return false;
  }
}
// Create a new context
export const MenuContext = createContext({
  menuItems: [],
  setMenuItems: () => {},
  expanded: true,
  setExpanded: () => {},
  darkMode: false,
  setDarkMode: () => {},
  lightModeColor: {
    background: "#E4E1DA",
    secondaryBackground: "#ffffff",
    text: "#E9FF20",
    secondaryText: "#565453",
    tertiaryText: "#FFFBEB",
    primary: "#d90429",
    secondary: "#FF0000",
    tertiary: "#E9FF20",
    iconColor: "#000000",
  },
  darkModeColor: {
    background: "#121212",
    secondaryBackground: "#27272A",
    text: "#E4E1DA",
    iconColor: "#ffffff",
  },
});






// Create a context provider component
export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  const iconColor = "#000000";
  const iconSize = "80px";

  ;
  
    const [menuItems, setMenuItems] = useState<menuItemType[]>([
      {
        name: "Dashboard",
        isSelected: true,
        icon: (
          <DashboardIcon
            width={iconSize}
            height={iconSize}
            color={darkMode ? "#ffffff" : "#000000"}
          />
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
  
  const [expanded, setExpanded] = useState(expandedLogic());
  

  const lightModeColor = {
    background: "#E4E1DA",
    secondaryBackground: "#ffffff",
    text: "#27272A",
    secondaryText: "#565453",
    tertiaryText: "#FFFBEB",
    primary: "#d90429",
    secondary: "#FF0000",
    tertiary: "#E9FF20",
    iconColor: "#000000",
  };
  const darkModeColor = {
    background: "#121212",
    secondaryBackground: "#27272A",
    text: "#E4E1DA",
    iconColor: "#ffffff",
  };

  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "true");
    } else {
      body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);


    
	const value = {
    menuItems,
    setMenuItems,
    expanded,
    setExpanded,
    darkMode,
    setDarkMode,
    lightModeColor,
    darkModeColor,
  };
	
    return (<MenuContext.Provider value={value}> {children} </MenuContext.Provider>);
};
