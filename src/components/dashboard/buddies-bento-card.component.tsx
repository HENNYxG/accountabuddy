import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserFriends, 
  faCheckCircle, 
  faClock,
  faExclamationTriangle,
  faTrophy,
  faFire
} from '@fortawesome/free-solid-svg-icons';
import BentoCard from './bento-card.component';

interface Buddy {
  id: string;
  name: string;
  avatar: string;
  status: 'completed' | 'pending' | 'overdue';
  sharedHabits: number;
  completedToday: number;
  totalToday: number;
  streak: number;
  lastActive: string;
}

const BuddiesBentoCard: React.FC = () => {
  // Mock data - replace with real data
  const buddies: Buddy[] = [
    {
      id: '1',
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'pending',
      sharedHabits: 3,
      completedToday: 1,
      totalToday: 3,
      streak: 8,
      lastActive: '2h ago'
    },
    {
      id: '2',
      name: 'Sarah Kim',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      status: 'overdue',
      sharedHabits: 2,
      completedToday: 0,
      totalToday: 2,
      streak: 15,
      lastActive: '1h ago'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      status: 'completed',
      sharedHabits: 4,
      completedToday: 4,
      totalToday: 4,
      streak: 22,
      lastActive: '30m ago'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />;
      case 'overdue':
        return <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500" />;
      default:
        return <FontAwesomeIcon icon={faClock} className="text-yellow-500" />;
    }
  };

  const pendingBuddies = buddies.filter(b => b.status !== 'completed');

  return (
    <BentoCard
      title="AccountaBuddies"
      subtitle={`${pendingBuddies.length} need attention`}
      variant="default"
      interactive
      icon={
        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
          <FontAwesomeIcon icon={faUserFriends} className="text-blue-600" />
        </div>
      }
      backgroundPattern={
        <div className="absolute inset-0">
          <div className="absolute top-4 right-4 w-16 h-16 bg-blue-500/5 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-blue-500/3 rounded-full"></div>
        </div>
      }
    >
      <div className="space-y-3">
        {pendingBuddies.slice(0, 3).map((buddy, index) => (
          <motion.div
            key={buddy.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src={buddy.avatar} 
                  alt={buddy.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{buddy.name}</p>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faFire} className="text-orange-500 text-xs" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">{buddy.streak} day streak</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {buddy.completedToday}/{buddy.totalToday} habits
                </p>
                <div className="w-16 h-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${(buddy.completedToday / buddy.totalToday) * 100}%` }}
                  />
                </div>
              </div>
              {getStatusIcon(buddy.status)}
            </div>
          </motion.div>
        ))}
        
        {buddies.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center pt-2"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              +{buddies.length - 3} more buddies
            </p>
          </motion.div>
        )}
      </div>
    </BentoCard>
  );
};

export default BuddiesBentoCard;

