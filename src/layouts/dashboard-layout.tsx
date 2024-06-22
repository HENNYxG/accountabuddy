import * as React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardView from "../routes/dashboard-view/dashboard-view.component";

export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  console.log("test", userId);

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <DashboardView />
      {/* <div className="bg-black">
        <Outlet />
      </div> */}
    </>
  );
}