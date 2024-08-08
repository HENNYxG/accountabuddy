import { motion } from "framer-motion";
import { useContext } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import {UIContext} from '../../contexts/ui.context';

const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";


const MobileDarkModeToggle = () => {
  const { darkMode, setDarkMode } = useContext(UIContext);

  function toggleDarkMode() {
    if (!darkMode) {
      setDarkMode(true);
      console.log("Dark Mode has turned on");
    } else {
      console.log("Dark Mode is already on");
      return;
    }
  }
  function toggleLightMode() {
    if (darkMode) {
      setDarkMode(false);
      console.log("Light Mode has turned on");
    } else {
      console.log("Light Mode is already on");
      return;
    }
  }
    
    return (
    //       <div
    //   className={`grid h-[200px] place-content-center px-4 transition-colors ${
    //     !darkMode ? "bg-white" : "bg-slate-900"
    //   }`}
    // >
    <div className="relative flex w-fit items-center rounded-full">
      <button
        className={`${TOGGLE_CLASSES} ${
          !darkMode ? "text-white" : "text-slate-300"
        }`}
        onClick={() => {
          toggleLightMode();
        }}
      >
        <FiMoon className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Light</span>
      </button>
      <button
        className={`${TOGGLE_CLASSES} ${
          darkMode ? "text-white" : "text-slate-800"
        }`}
        onClick={() => {
          toggleDarkMode();
        }}
      >
        <FiSun className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Dark</span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          darkMode ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
        />
      </div>
          </div>
            //   </div>
  );
};

export default MobileDarkModeToggle;
