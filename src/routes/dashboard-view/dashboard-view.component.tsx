import { Link, Outlet } from "react-router-dom";
import { Component, Fragment } from 'react';
import {UserButton} from "@clerk/clerk-react";
//import './Sidebare.style.scss';
import { ReactComponent as HomeIcon } from "../../assets/home-icon.svg"
import Sidebar from "../../components/sidebar/sidebar.component";

const DashboardView = () => {
  return (
    <div className="grid grid-cols-[250px_auto] h-screen w-screen">
      <Sidebar />
      <div className="flex flex-col gap-2 p-10 w-full h-full overflow-y-auto bg-backgroundIvory ">
        <Outlet />
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