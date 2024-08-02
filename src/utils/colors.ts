import { useContext, useState } from "react";
import { HabitsContext } from "../contexts/habits.context";

export const defaultColor = {
    default: "#d90429",
    50: "rgba(217, 4, 41, 0.5)",
    100: "rgba(217, 4, 41, 0.05)",
};

export const customRed = "#FF0000";
export const customGreen = "#E9FF20";
export const customCharcoal = "#27272A";
export const customStone = "#565453";
export const customIvory = "#FFFBEB";
export const backgroundIvory = "#E4E1DA";

export const lightModeColor = {
  background: "#E4E1DA",
  secondaryBackground: "#fffff",
  text: "#27272A",
  secondaryText: "#565453",
  tertiaryText: "#FFFBEB",
  primary: "#d90429",
  secondary: "#FF0000",
  tertiary: "#E9FF20",
};

export const darkModeColor = {
  background: "#121212",
  secondaryBackground: "#27272A",
  text: "#E4E1DA",
};



// export const setColor = () => {
//     const { darkMode } = useContext(HabitsContext);
//     const [color, setColor] = useState({
//       background: "#27272A",
//       text: "#E4E1DA",
//     });

//     if (darkMode === true) {
//         setColor({
//             background: "#fffff",
//             text: "#E4E1DA",
//         });
//         return color;
//     } else {
//         setColor({
//             background: "#E4E1DA",
//             text: "#27272A",
//             secondaryText: "#565453",
//             tertiaryText: "#FFFBEB",
//             primary: "#d90429",
//             secondary: "#FF0000",
//             tertiary: "#E9FF20",
//         });
//         return color;
//     }
// }