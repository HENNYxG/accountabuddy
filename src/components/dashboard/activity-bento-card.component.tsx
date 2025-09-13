import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faTrophy, 
  faFire,
  faMedal,
  faStar,
  faHeart,
  faComment,
  faBell
} from '@fortawesome/free-solid-svg-icons';
import BentoCard from './bento-card.component';

interface Activity {
  id: string;
  type: 'squad' | 'community';
  title: string;
  description: string;
  icon: string;
  time: string;
  participants: number;
  isNew: boolean;
  action?: string;
}

const ActivityBentoCard: React.FC = () => {
  // Mock data - replace with real data
  const activities: Activity[] = [
    {
      id: '1',
      type: 'squad',
      title: 'Fitness Warriors',
      description: 'Weekly challenge completed! 🏆',
      icon: 'trophy',
      time: '2h ago',
      participants: 12,
      isNew: true,
      action: 'View Results'
    },
    {
      id: '2',
      type: 'community',
      title: 'Morning Routines',
      description: 'New member joined the community',
      icon: 'users',
      time: '4h ago',
      participants: 45,
      isNew: false
    },
    {
      id: '3',
      type: 'squad',
      title: 'Study Squad',
      description: 'Daily reading goal achieved by 8 members',
      icon: 'star',
      time: '6h ago',
      participants: 8,
      isNew: true,
      action: 'Join Challenge'
    },
    {
      id: '4',
      type: 'community',
      title: 'Wellness Circle',
      description: 'New habit sharing opportunity available',
      icon: 'heart',
      time: '1d ago',
      participants: 23,
      isNew: false
    }
  ];

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      trophy: faTrophy,
      users: faUsers,
      star: faStar,
      heart: faHeart,
      fire: faFire,
      medal: faMedal,
      bell: faBell
    };
    return iconMap[iconName] || faUsers;
  };

  const newActivities = activities.filter(a => a.isNew);

  return (
    <BentoCard
      title="Activity Updates"
      subtitle={`${newActivities.length} new updates`}
      variant="accent"
      interactive
      icon={
        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
          <FontAwesomeIcon icon={faBell} className="text-white" />
        </div>
      }
      backgroundPattern={
        <div className="absolute inset-0">
          <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/5 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white/5 rounded-full"></div>
        </div>
      }
    >
      <div className="space-y-3">
        {activities.slice(0, 3).map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-3 rounded-xl backdrop-blur-sm ${
              activity.isNew 
                ? 'bg-white/20 border border-white/20' 
                : 'bg-white/10'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  activity.type === 'squad' ? 'bg-orange-500/20' : 'bg-purple-500/20'
                }`}>
                  <FontAwesomeIcon 
                    icon={getIcon(activity.icon)} 
                    className={`text-sm ${
                      activity.type === 'squad' ? 'text-orange-500' : 'text-purple-500'
                    }`} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-white truncate">{activity.title}</p>
                    {activity.isNew && (
                      <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs text-white">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-white/80 mb-2">{activity.description}</p>
                  <div className="flex items-center gap-3 text-xs text-white/60">
                    <span>{activity.participants} participants</span>
                    <span>•</span>
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>
              
              {activity.action && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 bg-white/20 rounded-lg text-xs text-white font-medium hover:bg-white/30 transition-colors"
                >
                  {activity.action}
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
        
        {activities.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center pt-2"
          >
            <p className="text-sm text-white/70">
              +{activities.length - 3} more updates
            </p>
          </motion.div>
        )}
      </div>
    </BentoCard>
  );
};

export default ActivityBentoCard;

