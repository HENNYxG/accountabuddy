import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faEllipsisH, 
  faUsers, 
  faTrophy,
  faChartBar,
  faCalendarAlt,
  faFire,
  faCheck,
  faTimes,
  faRunning,
  faFilter
} from '@fortawesome/free-solid-svg-icons';
import { BuddyMember, SharedHabit, BuddyComparison } from '../../types/social.types';
import HamburgerMenu from '../ui-elements/hamburger-menu.component';
import { UIContext } from '../../contexts/ui.context';
import useMediaQuery from '../../utils/mediaquery';

type BuddyDetailTab = 'overview' | 'activity';

interface BuddyDetailProps {
  buddy: BuddyMember;
  onBack: () => void;
  onShareHabit: (habitId: string) => void;
  onViewLeaderboard: () => void;
  onChat: () => void;
}

const BuddyDetail: React.FC<BuddyDetailProps> = ({
  buddy,
  onBack,
  onShareHabit,
  onViewLeaderboard,
  onChat
}) => {
  const { mobileWebsiteView } = useContext(UIContext);
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [activeTab, setActiveTab] = useState<BuddyDetailTab>('overview');

  // Mock data for demonstration
  const mockSharedHabits: SharedHabit[] = [
    {
      id: '1',
      buddyPairId: buddy.buddyPairId,
      habitId: 'habit1',
      inviterId: buddy.userId,
      rules: {
        requireApproval: false,
        visibleHistory: true,
        allowComments: true,
        shareCompletions: true,
        shareEmotions: true
      },
      startDate: '2024-01-01',
      isActive: true,
      createdAt: '2024-01-01'
    }
  ];

  const mockComparisons: BuddyComparison[] = [
    {
      habitId: 'habit1',
      habitName: 'Morning Run',
      yourStats: {
        currentStreak: 5,
        longestStreak: 12,
        completionRate: 85,
        lastCompleted: '2024-01-15'
      },
      buddyStats: {
        currentStreak: 3,
        longestStreak: 8,
        completionRate: 72,
        lastCompleted: '2024-01-14'
      },
      sharedSince: '2024-01-01'
    }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-4">
      {/* Shared Habits */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Shared Habits
        </h3>
        <div className="space-y-4">
          {/* Habit A - Two identical blue squares */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-500 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between mb-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faUsers} className="text-white text-xs" />
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-bold">4</span>
                  <FontAwesomeIcon icon={faFire} className="text-orange-300 text-xs" />
                </div>
              </div>
              <div className="text-center">
                <FontAwesomeIcon icon={faRunning} className="text-2xl mb-2" />
                <p className="font-medium">Habit Name</p>
              </div>
            </div>
            
            <div className="bg-blue-500 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between mb-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faUsers} className="text-white text-xs" />
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-bold">4</span>
                  <FontAwesomeIcon icon={faFire} className="text-orange-300 text-xs" />
                </div>
              </div>
              <div className="text-center">
                <FontAwesomeIcon icon={faRunning} className="text-2xl mb-2" />
                <p className="font-medium">Habit Name</p>
              </div>
            </div>
          </div>
          
          {/* Habit B - Them vs You comparison */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Habit B</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <p className="font-medium text-white mb-2">Them</p>
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mx-auto">
                  <FontAwesomeIcon icon={faCheck} className="text-white" />
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <p className="font-medium text-white mb-2">You</p>
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mx-auto">
                  <FontAwesomeIcon icon={faCheck} className="text-white" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Add more habits */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4 border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="text-center">
              <button
                onClick={() => onShareHabit('new')}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                + Share Another Habit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Leaderboard
          </h3>
          <button
            onClick={onViewLeaderboard}
            className="text-purple-600 hover:text-purple-700 text-sm"
          >
            View Full
          </button>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="space-y-3">
            {/* You */}
            <div className="flex items-center justify-between p-3 bg-purple-600 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-300 rounded-full flex items-center justify-center text-purple-800 text-sm font-semibold">
                  You
                </div>
                <div>
                  <p className="font-medium text-white">You</p>
                  <p className="text-xs text-purple-200">5 day streak</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faTrophy} className="text-yellow-300" />
                  <span className="font-bold text-white">1st</span>
                </div>
                <p className="text-xs text-purple-200">85% success</p>
              </div>
            </div>
            
            {/* Buddy */}
            <div className="flex items-center justify-between p-3 bg-gray-600 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {buddy.member.displayName.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-white">
                    {buddy.member.displayName}
                  </p>
                  <p className="text-xs text-gray-300">3 day streak</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faTrophy} className="text-gray-400" />
                  <span className="font-bold text-white">2nd</span>
                </div>
                <p className="text-xs text-gray-300">72% success</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-3">
        <button
          onClick={onChat}
          className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
        >
          <FontAwesomeIcon icon={faUsers} />
          <span>Chat</span>
        </button>
        
        <button
          onClick={() => onShareHabit('new')}
          className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
        >
          <FontAwesomeIcon icon={faUsers} />
          <span>Share Habit</span>
        </button>
      </div>
    </div>
  );

  const renderActivityTab = () => (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-md p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faFilter} className="text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">vs You</span>
          </div>
          
          <div className="flex space-x-2">
            {['Habit Name', 'Meditation', 'Reading'].map((habit, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center space-x-1 ${
                  index === 0 
                    ? 'bg-yellow-400 text-gray-900' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <FontAwesomeIcon icon={faRunning} className="text-xs" />
                <span>{habit}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Data */}
      <div className="space-y-4">
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="font-semibold text-white mb-2">
            Data Highlight 1
          </h4>
          <p className="text-sm text-gray-300">
            Comparison metrics and insights
          </p>
        </div>
        
        <div className="bg-yellow-400 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">
            Data Highlight 2
          </h4>
          <p className="text-sm text-gray-800">
            Key performance indicators
          </p>
        </div>
        
        <div className="bg-yellow-400 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">
            Data Table 3
          </h4>
          <p className="text-sm text-gray-800">
            Detailed comparison data
          </p>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="font-semibold text-white mb-2">
            Data Table 1 (7 day)
          </h4>
          <p className="text-sm text-gray-300">
            Weekly progress comparison
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-xl:flex-col gap-4 w-full flex flex-row p-3 relative">
      <div className="flex-grow">
        {/* Header */}
        <div className="bg-white p-5 rounded-md flex justify-between mb-4">
          <div className="flex items-center space-x-4 flex-1">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-gray-600 dark:text-gray-400" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {buddy.member.displayName.charAt(0)}
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {buddy.member.displayName}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  @{buddy.member.handle}
                </p>
              </div>
            </div>
          </div>
          
          {/* Mobile Hamburger Menu / Desktop Options Button */}
          <div className="flex flex-col">
            <div className="w-[50%] flex flex-col gap-3 align-middle center justify-between">
              <div className="w-[50%] h-[50px] flex">
                {isMobile ? (
                  <HamburgerMenu />
                ) : (
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <FontAwesomeIcon icon={faEllipsisH} className="text-gray-600 dark:text-gray-400" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-md mb-4">
          <div className="flex">
            {[
              { id: 'overview', label: 'Overview', icon: faChartBar },
              { id: 'activity', label: 'Activity', icon: faCalendarAlt }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as BuddyDetailTab)}
                className={`flex-1 flex items-center justify-center py-4 px-6 text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-yellow-600 border-b-2 border-yellow-600'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <FontAwesomeIcon icon={tab.icon} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'activity' && renderActivityTab()}
        </div>
      </div>
    </div>
  );
};

export default BuddyDetail;
