import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { UIContext } from "../contexts/ui.context";

 
const DarkMode = () => {
  const { darkMode, setDarkMode, darkModeColor, lightModeColor } =
    useContext(UIContext);

  function toggleDarkMode() {
    if (!darkMode) {
      setDarkMode(true);
      console.log("Dark Mode has turned on")
    } else {
      console.log("Dark Mode is already on");
      return
    }
  };
  function toggleLightMode() {
    if (darkMode) {
      setDarkMode(false);
       console.log("Light Mode has turned on");
    } else {
      console.log("Light Mode is already on");
      return
    }
  };

  return (
    <div
      // style={{
      //   color: darkMode ? darkModeColor.text : lightModeColor.text,
      //   backgroundColor: darkMode
      //     ? darkModeColor.secondaryBackground
      //     : lightModeColor.secondaryBackground,
      // }}
      className="bg-slate-100 dark:bg-[#27272A] w-[90px] relative rounded-3xl flex transition-all"
    >
      <div
        className="h-full w-[45px] z-40 flex justify-center items-center -mt-[2px]"
        onClick={toggleLightMode}
      >
        <FontAwesomeIcon
          className={` cursor-pointer transition-all ${
            darkMode ? "text-gray-300" : "text-customRed"
          }`}
          icon={faSun}
          width={20}
          height={20}
        />
      </div>
      <div
        className="h-full w-[45px] z-40 opacity-100 flex justify-center items-center -mt-[3px]"
        onClick={toggleDarkMode}
      >
        <FontAwesomeIcon
          className={`cursor-pointer transition-all ${
            darkMode ? "text-customGreen" : "text-gray-300"
          }`}
          icon={faMoon}
          width={20}
          height={20}
        />
      </div>
      <div
        className={`w-[38px] h-[38px] absolute top-1 rounded-full bg-white dark:bg-[#121212] shadow-sm transition-all ${
          darkMode ? "translate-x-[48px]" : "translate-x-1"
        }`}
      ></div>
    </div>
  );
};

export default DarkMode