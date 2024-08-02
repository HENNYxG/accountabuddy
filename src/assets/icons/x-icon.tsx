import { useContext } from "react";
import { UIContext } from "../../contexts/ui.context";

const XIcon = ({
  color = "#000000",
  width = "64px",
  height = "64px",
}) => {
  const { darkMode, lightModeColor, darkModeColor } = useContext(UIContext);
  let responsiveColor = "";
  if (darkMode === true) {
    responsiveColor = darkModeColor.iconColor;
  } else {
    responsiveColor = lightModeColor.iconColor;
  }

  return (
    <svg
      fill={responsiveColor}
      width={width}
      height={height}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fill={responsiveColor}
          d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
        ></path>
      </g>
    </svg>
  );}

export default XIcon;
