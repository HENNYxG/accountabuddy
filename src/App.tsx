import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Dashboard from './routes/dashboard/dashboard.component';
import DashboardView from "./routes/application-view/dashboard-view.component";

import './App.css';
import { SignIn } from '@clerk/clerk-react';
import SignInPage from './routes/sign-in';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/home" element={<Home />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/dashboard" element={<DashboardView />}>
        <Route index element={<Dashboard />} />
      </Route> */}
    </Routes>
  );
}

export default App;
