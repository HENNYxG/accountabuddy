import { useContext } from "react";
import { MenuContext } from "../../contexts/menu.context";

const DashboardIcon = ({
  color = "#000000",
  width = "64px",
  height = "64px",
}) => {
  const { darkMode, lightModeColor, darkModeColor } = useContext(MenuContext);
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
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="transition-all"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path d="M28 0h-24c-2.208 0-4 1.792-4 4v24c0 2.208 1.792 4 4 4h24c2.208 0 4-1.792 4-4v-24c0-2.208-1.792-4-4-4zM13.922 24.24c0 1.063-0.859 1.922-1.922 1.922h-5.922c-1.057 0-1.917-0.865-1.917-1.922v-18.161c0-1.057 0.859-1.917 1.917-1.917h5.922c1.063 0 1.922 0.859 1.922 1.917zM27.839 16.24c0 1.057-0.859 1.922-1.917 1.922h-5.922c-1.063 0-1.922-0.865-1.922-1.922v-10.161c0-1.057 0.865-1.917 1.922-1.917h5.922c1.057 0 1.917 0.859 1.917 1.917z"></path>{" "}
      </g>
    </svg>
  );
};

export default DashboardIcon;
