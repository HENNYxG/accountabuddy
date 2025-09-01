import React from 'react';
import { Outlet } from 'react-router-dom';
import TabNavigation from '../components/navigation/tab-navigation.component';

const TabLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <main className="pb-20">
        <Outlet />
      </main>
      
      {/* Bottom Tab Navigation */}
      <TabNavigation />
    </div>
  );
};

export default TabLayout;

