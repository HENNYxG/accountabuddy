import { useContext } from "react";
import { UIContext } from "../../contexts/ui.context";

const HabitsTabIcon = ({
  color = "#000000",
  width = "64px",
  height = "64px",
}) => {
  const { darkMode, lightModeColor, darkModeColor } = useContext(UIContext);
  let responsiveColor = "";
  if (darkMode === true) {
    responsiveColor = darkModeColor.iconColor
  } else {
    responsiveColor = lightModeColor.iconColor;;
  }

  return (
    <svg
      fill={responsiveColor}
      width={width}
      height={height}
      viewBox="-2 -2 22 22"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="transition-all"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M6 0h8a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6zm6 9a1 1 0 0 0 0 2h3a1 1 0 1 0 0-2h-3zm-2 4a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2h-5zm0-8a1 1 0 1 0 0 2h5a1 1 0 0 0 0-2h-5zm-4.172 5.243l-.707-.707a1 1 0 1 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.415 0l2.828-2.828A1 1 0 0 0 7.95 8.12l-2.122 2.122z"></path>
      </g>
    </svg>
  );}

export default HabitsTabIcon;
