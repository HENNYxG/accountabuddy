import { Link, Outlet } from "react-router-dom";
import { Component, Fragment, useEffect, useState,  } from 'react';
import {UserButton} from "../../utils/clerk-shim";
//import './Sidebare.style.scss';
import { ReactComponent as HomeIcon } from "../../assets/home-icon.svg"
import Sidebar, { SidebarTwo } from "../../components/sidebar/sidebar.component";
import { UIContext } from "../../contexts/ui.context";
import { useContext } from "react";
import DotPattern from "../../components/backgrounds/dot-pattern-bg.component";
import GridPattern from "../../components/backgrounds/grid-pattern-bg.component";
import { cn } from "../../utils/utils";
import { darkModeColor, lightModeColor } from "../../utils/colors";
import { Toaster } from "react-hot-toast";


const DashboardView = () => {
  const { expanded, setExpanded, darkMode } = useContext(UIContext);

  
  const handleResize = () => {
  if (window.innerWidth < 720) {
      setExpanded(false)
  } 
}
useEffect(() => {
  window.addEventListener("resize", handleResize);
});
  
  useEffect(() => { 
  const body = document.body;
  if (darkMode) {
    body.classList.add("dark");
    localStorage.setItem("dark", "true");
  } else {
    body.classList.remove("dark");
    localStorage.setItem("dark", "false");
  }
}, [darkMode]);

  return (
    <div
      style={{
        color: darkMode ? darkModeColor.text : lightModeColor.text,
        backgroundColor: darkMode
          ? darkModeColor.background
          : lightModeColor.background,
      }}
      className="transition-all"
    >
      <Toaster />
      <div
        className={`max-sm:flex max-sm:grid-cols-1  grid h-screen w-screen overflow-y-hidden  transition-all ${
          expanded ? "grid-cols-[300px_auto]  " : "grid-cols-[80px_auto]"
        } `}
      >
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          // strokeDasharray={"4 2"}
          // className="color-black"
          className={cn(
            "[mask-image:radial-gradient(ellipse_at_center,black,transparent_90%)] color-black"
          )}
        />

        {/* <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,transparent,white,white,transparent)] "
        )}
      /> */}
        {/* <Sidebar /> */}
        <div className="max-sm:hidden">
          <SidebarTwo />
        </div>

        {/* <Sidebar Mobile/> */}
        <div className="= hidden max-sm:flex">
          <SidebarTwo />
        </div>
        
        <div className="max-sm: flex flex-col w-full h-full overflow-y-auto  ">
          <Outlet />
        </div>
      </div>
    </div>
  );

  // <Fragment>
  // <ul>
  //     <li>
  //     <Link to="/">Home</Link>
  //     </li>
  //     <li>
  //     <Link to="/about">About</Link>
  //     </li>
  //     </ul>
  //     <Outlet />
  // </Fragment>
};
    export default DashboardView;