import { ReactNode, createContext, useState, useEffect } from 'react';

import { menuItemType } from '../types/menuItemType';

import DashboardIcon from "../assets/icons/dashboard-icon";
import HabitsTabIcon from "../assets/icons/habits-tab-icon";
import BuddyIcon from '../assets/icons/buddy-icon';
import AnalysisIcon from '../assets/icons/analysis-icon';
import ChatIcon from '../assets/icons/chat-icon';
import useMediaQuery from '../utils/mediaquery';


const expandedLogic = () => {
  if (window.innerWidth > 720) {
    return true;
  } else {
    return false;
  }
}
// Create a new context
export const UIContext = createContext({
  menuItems: [] as menuItemType[],
  setMenuItems: (menuItems: Array<menuItemType>) => {},
  expanded: true,
  setExpanded: (expanded: boolean) => {},
  darkMode: false,
  setDarkMode: (darkMode: boolean) => {},
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
    greyBG: "#f3f4f6",
    greyText: "#9ca3af",
    mutedGreen: "#f5ff97",
  },
  darkModeColor: {
    background: "#121212",
    secondaryBackground: "#27272A",
    text: "#E4E1DA",
    iconColor: "#ffffff",
    greyBG: "#374151",
  },
  habitWindowOpen: false,
  setHabitWindowOpen: (habitWindowOpen: boolean) => {},
  timePickerWindowOpen: false,
  setTimePickerWindowOpen: (timePickerWindowOpen: boolean) => { },
  mobileMenuIsOpen: false,
  setMobileMenuIsOpen: (mobileMenuIsOpen: boolean) => { },
  mobileWebsiteView: false,
});






// Create a context provider component
export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [habitWindowOpen, setHabitWindowOpen] = useState(false);
  const [timePickerWindowOpen, setTimePickerWindowOpen] = useState(false);
  const iconColor = "#000000";
  const iconSize = "80px";

  
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
    greyBG: "#f3f4f6",
    greyText: "#9ca3af",
    mutedGreen: "#f5ff97",
  };
  const darkModeColor = {
    background: "#121212",
    secondaryBackground: "#27272A",
    text: "#E4E1DA",
    iconColor: "#ffffff",
    greyBG: "#374151",
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

  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  const mobileWebsiteView = useMediaQuery('(max-width: 640px)');
      

 
    useEffect(() => {
      if (mobileWebsiteView) {
        if (expanded) {
          setMobileMenuIsOpen(true);
        } else {
          setMobileMenuIsOpen(false);
        }
      }
    }, [expanded])


    
	const value = {
    menuItems,
    setMenuItems,
    expanded,
    setExpanded,
    darkMode,
    setDarkMode,
    lightModeColor,
    darkModeColor,
    habitWindowOpen,
    setHabitWindowOpen,
    timePickerWindowOpen,
    setTimePickerWindowOpen,
    mobileMenuIsOpen,
    setMobileMenuIsOpen,
    mobileWebsiteView,
  };
	
    return (<UIContext.Provider value={value}> {children} </UIContext.Provider>);
};
