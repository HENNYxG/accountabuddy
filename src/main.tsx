import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Import the layouts
import RootLayout from "./layouts/root-layout";
import DashboardLayout from "./layouts/dashboard-layout";

// Import the components
import Home from "./routes/home/home.component";
import SignInPage from "./routes/sign-in";
import SignUpPage from "./routes/sign-up";
import Dashboard from "./routes/dashboard/dashboard.component";
import DashboardView from "./routes/dashboard-view/dashboard-view.component";
import NewUser from "./routes/new-user";




const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
      { path: "/new-user/*", element: <NewUser /> },
      {
        element: <DashboardLayout />,
        path: "dashboard",
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/dashboard/invoices", element: <DashboardView /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);