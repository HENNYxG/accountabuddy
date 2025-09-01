import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

// Import the layouts
import RootLayout from "./layouts/root-layout";
import DashboardLayout from "./layouts/dashboard-layout";
import TabLayout from "./layouts/tab-layout";

// Import the components
import Home from "./routes/home/home.component";
import SignInPage from "./routes/sign-in";
import SignUpPage from "./routes/sign-up";
import Dashboard from "./routes/dashboard/dashboard.component";
import DashboardView from "./routes/application-view/dashboard-view.component";
import NewUser from "./routes/new-user";

// Import new pages
import HabitsPage from "./pages/habits/habits.page";
import SocialPage from "./pages/social/social.page";
import ChatPage from "./pages/chat/chat.page";
import TrendsPage from "./pages/trends/trends.page";

//Import Providers
import { UIProvider } from "./contexts/ui.context";
// SessionProvider is applied in RootLayout
import { HabitsProvider } from "./contexts/habits.context";

// Import service worker
import * as serviceWorker from "./serviceWorker";

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

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
      {
        element: <TabLayout />,
        path: "/app",
        children: [
          { path: "/app", element: <HabitsPage /> },
          { path: "/app/habits", element: <HabitsPage /> },
          { path: "/app/social", element: <SocialPage /> },
          { path: "/app/chat", element: <ChatPage /> },
          { path: "/app/trends", element: <TrendsPage /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <UIProvider>
          <HabitsProvider>
            <RouterProvider router={router} />
          </HabitsProvider>
        </UIProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// Register service worker for PWA functionality
serviceWorker.register({
  onSuccess: (registration) => {
    console.log('PWA: Content is cached for offline use.');
  },
  onUpdate: (registration) => {
    console.log('PWA: New content is available and will be used when all tabs are closed.');
    // You can show a notification to the user here
  },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
