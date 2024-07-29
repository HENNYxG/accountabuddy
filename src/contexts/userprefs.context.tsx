// import { ReactNode, createContext, useEffect, useState } from "react";



// export const UserPrefsContext = createContext({
//   darkMode: false,
//   setDarkMode: () => {},
//   lightModeColor: {
//     background: "#E4E1DA",
//     secondaryBackground: "#ffffff",
//     text: "#E9FF20",
//     secondaryText: "#565453",
//     tertiaryText: "#FFFBEB",
//     primary: "#d90429",
//     secondary: "#FF0000",
//     tertiary: "#E9FF20",
//     iconColor: "#000000",
//   },
//   darkModeColor: {
//     background: "#121212",
//     secondaryBackground: "#27272A",
//     text: "#E4E1DA",
//     iconColor: "#ffffff",
//   },
// });

// export const UserPrefsProvider = ({ children }: { children: ReactNode }) => {
//   const [darkMode, setDarkMode] = useState(false); 
//   const lightModeColor = {
//     background: "#E4E1DA",
//     secondaryBackground: "#ffffff",
//     text: "#27272A",
//     secondaryText: "#565453",
//     tertiaryText: "#FFFBEB",
//     primary: "#d90429",
//     secondary: "#FF0000",
//     tertiary: "#E9FF20",
//     iconColor: "#000000",
//   };
//   const darkModeColor = {
//     background: "#121212",
//     secondaryBackground: "#27272A",
//     text: "#E4E1DA",
//     iconColor: "#ffffff",
//   };

// useEffect(() => { 
//   const body = document.body;
//   if (darkMode) {
//     body.classList.add("dark-mode");
//     localStorage.setItem("darkMode", "true");
//   } else {
//     body.classList.remove("dark-mode");
//     localStorage.setItem("darkMode", "false");
//   }
// }, [darkMode]);

//   	const value = { darkMode, setDarkMode, lightModeColor, darkModeColor };
//   return (
//     <UserPrefsContext.Provider value={value}> {children} </UserPrefsContext.Provider>
//   );
// };
