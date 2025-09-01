import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faListCheck, 
  faUsers, 
  faComments, 
  faChartLine,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import { UIContext } from '../../contexts/ui.context';
import { customCharcoal } from '../../utils/colors';

interface TabItem {
  id: string;
  label: string;
  icon: any;
  path: string;
  badge?: number;
}

const TabNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode } = React.useContext(UIContext);
  const [showSettings, setShowSettings] = useState(false);

  const tabs: TabItem[] = [
    { id: 'home', label: 'Home', icon: faHome, path: '/' },
    { id: 'habits', label: 'Habits', icon: faListCheck, path: '/habits' },
    { id: 'social', label: 'Social', icon: faUsers, path: '/social' },
    { id: 'chat', label: 'Chat', icon: faComments, path: '/chat' },
    { id: 'trends', label: 'Trends', icon: faChartLine, path: '/trends' },
  ];

  const isActiveTab = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Settings Popover */}
      {showSettings && (
        <div className="absolute bottom-full left-0 right-0 mb-2 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/settings/profile')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium"
              >
                Profile Settings
              </button>
              <button 
                onClick={() => navigate('/settings/notifications')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium"
              >
                Notifications
              </button>
              <button 
                onClick={() => navigate('/settings/privacy')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium"
              >
                Privacy
              </button>
              <button 
                onClick={() => navigate('/settings/account')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium"
              >
                Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Bar */}
      <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Main Tabs */}
          <div className="flex-1 flex items-center justify-around">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.path)}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 ${
                  isActiveTab(tab.path)
                    ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <div className="relative">
                  <FontAwesomeIcon 
                    icon={tab.icon} 
                    className="text-lg mb-1"
                  />
                  {tab.badge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Settings Button */}
          <button
            onClick={handleSettingsClick}
            className="ml-2 p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          >
            <FontAwesomeIcon icon={faCog} className="text-lg" />
          </button>
        </div>
      </div>

      {/* Safe Area for iOS */}
      <div className="h-safe-area-inset-bottom bg-white dark:bg-gray-900" />
    </div>
  );
};

export default TabNavigation;

