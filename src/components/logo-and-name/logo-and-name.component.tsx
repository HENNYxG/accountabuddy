import { defaultColor } from "../../utils/colors";
import AppIcon from "../app-icon/app-icon.component";
import { useContext } from "react";
import { MenuContext } from "../../contexts/menu.context";

const LogoAndName = () => {
  const { expanded } = useContext(MenuContext);
  if (expanded) {
    return (
      <div className="flex gap-2 items-center sm:justify-start justify-center">
        <span className="text-2xl font-light flex items-center gap-2">
          {/* the icon */}
          <div
            style={{ backgroundColor: defaultColor.default }}
            className=" p-2 rounded-md"
          >
            <AppIcon color="#fff" height="30" width="30" />
          </div>
          {/* Name of app */}
          <span
            style={{ color: "#d90429" }}
            className="font-bold text-mainColor"
          >
            Accounta<span className="font-bold text-customCharcoal">Buddy</span>
          </span>
        </span>
      </div>
    );
  } else {
       return (
         <div className="flex gap-2 items-center sm:justify-start justify-center">
             {/* the icon */}
             <div
               style={{ backgroundColor: defaultColor.default }}
               className=" p-2 rounded-md"
             >
               <AppIcon color="#fff" height="24" width="24" />
             </div>
         </div>
       );
  }

}
export default LogoAndName;
