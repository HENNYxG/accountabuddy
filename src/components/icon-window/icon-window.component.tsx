import { useState, useContext } from "react";
import { UIContext } from "../../contexts/ui.context";
import { iconsData } from "./icon-data.component";
import CloseButton from "../ui-elements/close-button.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const IconsWindow = ({ openIconWindow, setOpenIconWindow, iconSelected, setIconSelected }: {
    openIconWindow: boolean,
    setOpenIconWindow: React.Dispatch<React.SetStateAction<boolean>>;
    iconSelected: IconProp;
    setIconSelected: React.Dispatch<React.SetStateAction<IconProp>>;
}) => {
    const [allIcons, setAllIcons] = useState(iconsData);
    const { darkMode, darkModeColor, lightModeColor } = useContext(UIContext);
    
    console.log(openIconWindow);
    return (
      <div
        style={{
          backgroundColor: darkMode
            ? darkModeColor.secondaryBackground
            : lightModeColor.secondaryBackground,
          color: darkMode ? darkModeColor.text : lightModeColor.text,
        }}
        className={` z-[65] md:w-[80%] w-full md:left-[50%] transform md:-translate-x-[50%] -translate-x-[10%] p-4 rounded-md border flex flex-col gap-6 shadow-md ${
          openIconWindow ? "absolute" : "hidden"
        }`}
      >
        <CloseButton
          onClick={() => setOpenIconWindow(false)}
          className="absolute top-4 right-4"
        />
        <span className="font-bold text-lg bg-transparent mt-3">
          Choose Your Icon
        </span>
        <div className="border border-gray-200 p-2 grid max-sm:grid-cols-3 grid-cols-4 md:flex md:flex-wrap gap-2 items-center rounded-md mb-5 md:p-5 md:gap-4 justify-around ">
          {allIcons.map((icon, iconIndex) => (
            <FontAwesomeIcon
              key={iconIndex}
              className={`border p-2 border-gray-300 rounded-md text-xl cursor-pointer  hover:border-customGreen hover:bg-customGreen transition  ${iconSelected === icon.faIcon ? "border-customGreen bg-customGreen" : ""}`}
              height={50}
              width={50}
              icon={icon.faIcon}
              onClick={() => {
                setIconSelected(icon.faIcon);
                setOpenIconWindow(false);
              }}
            />
          ))}
        </div>
      </div>
    );
}

export default IconsWindow