import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faCalendar, faTrophy, faFire } from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import HamburgerMenu from '../../components/ui-elements/hamburger-menu.component';
import { UIContext } from '../../contexts/ui.context';
import useMediaQuery from '../../utils/mediaquery';

type TimeRange = 'week' | 'month' | 'year';

const TrendsPage: React.FC = () => {
  const { mobileWebsiteView } = useContext(UIContext);
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [timeRange, setTimeRange] = useState<TimeRange>('week');

  // Mock data for charts
  const weeklyData = [
    { day: 'Mon', completions: 5, streak: 3 },
    { day: 'Tue', completions: 7, streak: 4 },
    { day: 'Wed', completions: 6, streak: 5 },
    { day: 'Thu', completions: 8, streak: 6 },
    { day: 'Fri', completions: 9, streak: 7 },
    { day: 'Sat', completions: 4, streak: 8 },
    { day: 'Sun', completions: 6, streak: 9 },
  ];

  const emotionData = [
    { name: 'Happy', value: 45, color: '#10B981' },
    { name: 'Neutral', value: 35, color: '#F59E0B' },
    { name: 'Sad', value: 20, color: '#EF4444' },
  ];

  const habitPerformance = [
    { name: 'Morning Run', completions: 25, target: 30, percentage: 83 },
    { name: 'Read Books', completions: 18, target: 21, percentage: 86 },
    { name: 'Drink Water', completions: 56, target: 56, percentage: 100 },
    { name: 'Meditation', completions: 12, target: 21, percentage: 57 },
  ];

  const timeRanges = [
    { id: 'week' as TimeRange, label: 'Week', icon: faCalendar },
    { id: 'month' as TimeRange, label: 'Month', icon: faChartLine },
    { id: 'year' as TimeRange, label: 'Year', icon: faTrophy },
  ];

  return (
    <div className="max-xl:flex-col gap-4 w-full flex flex-row p-3 relative">
      <div className="flex-grow">
        {/* Header */}
        <div className="bg-white p-5 rounded-md flex justify-between mb-4">
          <div className="flex flex-col relative">
            <h1 className="text-5xl font-extrabold">Trends & Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your progress and discover patterns in your habits
            </p>
          </div>
          
          {/* Mobile Hamburger Menu */}
          <div className="flex flex-col">
            <div className="w-[50%] flex flex-col gap-3 align-middle center justify-between">
              <div className="w-[50%] h-[50px] flex">
                {isMobile && <HamburgerMenu />}
              </div>
            </div>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="bg-white rounded-md p-1 mb-4">
          <div className="flex">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  timeRange === range.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <FontAwesomeIcon icon={range.icon} className="mr-2" />
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-white rounded-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Completions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">45</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faChartLine} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Current Streak</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">9</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faFire} className="text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">85%</p>
              </div>
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faTrophy} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Habits</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">4</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faCalendar} className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Completion Trend */}
          <div className="bg-white rounded-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Completion Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="completions" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Emotion Distribution */}
          <div className="bg-white rounded-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Emotion Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={emotionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {emotionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Habit Performance */}
        <div className="bg-white rounded-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Habit Performance
          </h3>
          <div className="space-y-4">
            {habitPerformance.map((habit, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{habit.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {habit.completions} / {habit.target} completions
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${habit.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {habit.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-white rounded-md p-6 mt-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Insights
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-gray-700 dark:text-gray-300">
                You're most consistent with "Drink Water" - 100% completion rate this week!
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <p className="text-gray-700 dark:text-gray-300">
                "Meditation" needs attention - only 57% completion rate. Try setting a reminder.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-gray-700 dark:text-gray-300">
                Your current streak of 9 days is your best yet! Keep up the momentum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendsPage;
