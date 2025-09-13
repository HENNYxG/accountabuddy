import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faArrowUp, 
  faArrowDown,
  faFire,
  faTrophy,
  faClock,
  faBullseye
} from '@fortawesome/free-solid-svg-icons';
import BentoCard from './bento-card.component';

interface TrendData {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

const TrendsBentoCard: React.FC = () => {
  // Mock data - replace with real data
  const trends: TrendData[] = [
    {
      label: 'Weekly Adherence',
      value: 87,
      change: 12,
      trend: 'up',
      color: 'text-green-500'
    },
    {
      label: 'Best Streak',
      value: 23,
      change: 5,
      trend: 'up',
      color: 'text-orange-500'
    },
    {
      label: 'On-time Rate',
      value: 94,
      change: -2,
      trend: 'down',
      color: 'text-blue-500'
    },
    {
      label: 'Prime Time',
      value: 8,
      change: 1,
      trend: 'up',
      color: 'text-purple-500'
    }
  ];

  const insights = [
    {
      title: "You're most productive in the morning",
      description: "8-10 AM is your peak performance window",
      icon: faClock,
      color: "text-blue-500"
    },
    {
      title: "Reading habit is on fire! 🔥",
      description: "15 day streak - your longest yet",
      icon: faFire,
      color: "text-orange-500"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <FontAwesomeIcon icon={faArrowUp} className="text-green-500" />;
      case 'down':
        return <FontAwesomeIcon icon={faArrowDown} className="text-red-500" />;
      default:
        return <FontAwesomeIcon icon={faChartLine} className="text-gray-500" />;
    }
  };

  return (
    <BentoCard
      title="Key Trends"
      subtitle="Your performance insights"
      variant="default"
      interactive
      icon={
        <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
          <FontAwesomeIcon icon={faChartLine} className="text-green-600" />
        </div>
      }
      backgroundPattern={
        <div className="absolute inset-0">
          <div className="absolute top-4 right-4 w-16 h-16 bg-green-500/5 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-green-500/3 rounded-full"></div>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Trend Metrics */}
        <div className="grid grid-cols-2 gap-3">
          {trends.map((trend, index) => (
            <motion.div
              key={trend.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {trend.label}
                </span>
                {getTrendIcon(trend.trend)}
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-xl font-bold ${trend.color}`}>
                  {trend.value}
                  {trend.label.includes('Rate') || trend.label.includes('Adherence') ? '%' : ''}
                </span>
                <span className={`text-xs ${trend.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {trend.trend === 'up' ? '+' : ''}{trend.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Insights */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Insights</h4>
          {insights.map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30"
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 ${insight.color} flex items-center justify-center`}>
                  <FontAwesomeIcon icon={insight.icon} className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {insight.title}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {insight.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
};

export default TrendsBentoCard;
