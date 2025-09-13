import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFire, 
  faTrophy, 
  faBullseye,
  faCalendarCheck,
  faChartLine,
  faMedal
} from '@fortawesome/free-solid-svg-icons';
import BentoCard from './bento-card.component';

interface Stat {
  label: string;
  value: string | number;
  icon: any;
  color: string;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
}

const QuickStatsBentoCard: React.FC = () => {
  const stats: Stat[] = [
    {
      label: "Today's Progress",
      value: "87%",
      icon: faBullseye,
      color: "text-blue-600",
      change: "+5%",
      trend: 'up'
    },
    {
      label: "Current Streak",
      value: "12 days",
      icon: faFire,
      color: "text-orange-500",
      change: "+2 days",
      trend: 'up'
    },
    {
      label: "Perfect Days",
      value: "8",
      icon: faTrophy,
      color: "text-yellow-600",
      change: "+1",
      trend: 'up'
    },
    {
      label: "Weekly Goal",
      value: "92%",
      icon: faChartLine,
      color: "text-green-600",
      change: "+3%",
      trend: 'up'
    }
  ];

  const achievements = [
    {
      title: "Early Bird",
      description: "Completed 5 habits before 8 AM",
      icon: faMedal,
      color: "text-yellow-500",
      progress: 100
    },
    {
      title: "Consistency King",
      description: "7-day streak on 3 habits",
      icon: faTrophy,
      color: "text-orange-500",
      progress: 85
    }
  ];

  return (
    <BentoCard
      title="Quick Stats"
      subtitle="Your daily overview"
      variant="muted"
      interactive
      icon={
        <div className="w-8 h-8 bg-gray-500/20 rounded-lg flex items-center justify-center">
          <FontAwesomeIcon icon={faChartLine} className="text-gray-600" />
        </div>
      }
      backgroundPattern={
        <div className="absolute inset-0">
          <div className="absolute top-4 right-4 w-16 h-16 bg-gray-500/5 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-gray-500/3 rounded-full"></div>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-6 h-6 ${stat.color} flex items-center justify-center`}>
                  <FontAwesomeIcon icon={stat.icon} className="text-sm" />
                </div>
                {stat.change && (
                  <span className={`text-xs font-medium ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                )}
              </div>
              <div className="mb-1">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Recent Achievements</h4>
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 ${achievement.color} flex items-center justify-center`}>
                  <FontAwesomeIcon icon={achievement.icon} className="text-sm" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {achievement.title}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {achievement.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="w-12 h-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full transition-all duration-300"
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {achievement.progress}%
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

export default QuickStatsBentoCard;
