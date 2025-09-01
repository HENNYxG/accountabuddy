import React from 'react';

const HabitsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Habits
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your daily habits and build consistency
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <p className="text-gray-600 dark:text-gray-400">
          Simple habits page - no enhanced features
        </p>
      </div>
    </div>
  );
};

export default HabitsPage;
